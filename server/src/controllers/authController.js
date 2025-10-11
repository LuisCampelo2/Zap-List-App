import User from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { emailService } from '../services/email.service.js';
import { userService } from '../services/user.service.js';
import { jwtService } from '../services/jwt.service.js';
const isProduction = process.env.NODE_ENV === 'production';

const register = async (req, res) => {
  try {
    const { email, password, name, lastName, } = req.body;

    const user = await userService.findByEmail(email);

    if (user) {
      return res.status(400).json({ message: 'Já existe uma conta com este email' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          `A senha deve ter pelo menos 8 caracteres,` +
          `incluindo uma maiúscula, uma minúscula,` +
          `um número e um caractere especial.`
      });
    }
    const activationToken = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, activationToken, name, last_name: lastName });
     emailService.sendActivationEmail(email, activationToken)
      .catch(err => console.error("Erro ao enviar e-mail:", err));
    res.json({
      message:'Token enviado para o email!',
      newUser
    });
  } catch (err) {
    console.log(err);
  }

}

const activate = async (req, res) => {
  try {
    const { activationToken } = req.params;

    const user = await User.findOne({ where: { activationToken } });

    if (!user) {
      return res.status(404).send('Token de ativação inválido ou expirado.');
    }

    user.activationToken = null;
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  };
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Não existe uma conta com este email' });
    }

    if (user.activationToken !== null) {
      return res.status(403).json({ message: 'Conta precisa ser ativada' })
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const normalizedUser = userService.normalizedUser(user);

    const accessToken = jwtService.sign(normalizedUser);
    const refreshToken = jwtService.signRefresh(normalizedUser);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: process.env.FRONTEND_DOMAIN,
    });

    return res.json({
      accessToken,
      user: normalizedUser,
      message: 'Login realizado com sucesso'
    });

  } catch (error) {
    console.log(error);
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: process.env.FRONTEND_DOMAIN,
    });

    return res.status(500).json({ message: 'Erro interno ao tentar fazer login' });
  }
}

const sendEmailWithToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userService.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Não existe uma conta com este email' });
    }

    const token = crypto.randomInt(1000, 10000).toString();

    await User.update(
      { resetPasswordToken: token },
      { where: { email } }
    );

    await emailService.sendToken(email, token);

    return res.status(200).json({ message: 'Token enviado com sucesso' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

const compareToken = async (req, res) => {
  try {
    const { tokenClient, email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (tokenClient === user.resetPasswordToken) {
      await User.update({ resetPasswordToken: null }, { where: { email } });
      console.log(`resetado token em ${email}`);
      return res.status(200).json({ message: 'Token correto' });
    } else {
      return res.status(401).json({ message: 'Código errado' });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, email } = req.body; 
   
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          `A senha deve ter pelo menos 8 caracteres,` +
          `incluindo uma maiúscula, uma minúscula,` +
          `um número e um caractere especial.`
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
   

    await User.update(
      { password: hashedPassword },
      { where: { email } }
    );
    return res.status(200).json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro interno' });
  }
}
const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: process.env.FRONTEND_DOMAIN,
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
}

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token não encontrado' });
    }

    const decoded = jwtService.verifyRefresh(refreshToken);

    if (!decoded) {
      return res.status(403).json({ message: 'Refresh token inválido ou expirado' });
    }

    const user = await userService.findByEmail(decoded.email);

    if (!user || user.activationToken !== null) {
      return res.status(401).json({ message: 'Usuário inválido ou inativo' });
    }

    const normalizedUser = userService.normalizedUser(user);
    const newAccessToken = jwtService.sign(normalizedUser);

    return res.json({ accessToken: newAccessToken, user: normalizedUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao renovar token' });
  }
};
export const authController = {
  register,
  activate,
  login,
  logout,
  refresh,
  sendEmailWithToken,
  compareToken,
  resetPassword
}