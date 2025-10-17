# Zap-List-App
# README — App React Native + Backend Express

Este documento descreve, passo a passo, como configurar e rodar um projeto com **front-end em React Native** e **back-end em Express (Node.js)**. Inclui instruções para quem usa **Expo**, execução ememuladores/dispositivos e dicas de depuração.

---

## 1. Pré-requisitos

Antes de começar, instale as ferramentas abaixo (verifique as versões mais recentes nas páginas oficiais):

* Node.js (recomendado: v18+)
* npm (vem com Node) ou yarn
* Git
* Para desenvolvimento mobile:


  * Expo GO no celular
  * Android Studio + Android SDK (para emulador Android)
  * Xcode (somente macOS, para build iOS)

> Observação: se for usar Expo, não precisa configurar SDKs nativos a princípio — basta ter o app Expo Go no celular ou emulador.

---

## 2. Configurando o backend (Express)

### 2.1 Instalar dependências

No diretório `backend`:

```bash
cd server
npm install
# ou
# yarn
```

### 2.2 Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta server com as variáveis necessárias. Como este aqui:

```
# Configurações do MySQL
MYSQLDATABASE=
MYSQLPORT=
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLROOTPASSWORD=
MYSQLHOST=localhost

# Configurações alternativas (produção)
# MYSQLDATABASE=
# MYSQLPORT=
# MYSQLUSER=root=
# MYSQLPASSWORD=
# MYSQLROOTPASSWORD=
# MYSQLHOST=

# Configurações de e-mail (SendGrid) (opcional)
SENDGRID_API_KEY=

# URLs de backend e frontend
BACKEND_URL=
FRONTEND_URL=

# JWT (autenticação)
JWT_KEY=
JWT_REFRESH_KEY=
```

### 2.3 Rodar o backend

```bash
# modo dev (recomendado)
npm run start
# ou
npm start
```

---

## 4. Configurando o front-end

 **Expo** (rápido e fácil) Instruções para ambas abaixo.

### 4.1 Expo (se estiver usando Expo)

No diretório `mobile`:

```bash
cd client
npm install
# ou
# yarn
```

Crie um arquivo `.env` dentro da pasta client Como este aqui:

API_URL=(Endereço de onde está rodando seu backend exemplo:http://192.168.0.16:3000)

Rodar com:

```bash
# iniciar dev server do expo
npx expo start
# ou
expo start
```

* Abra no celular com o app **Expo Go** (escaneie o QR code) ou
* Rode em emulador Android: pressione `a` no terminal do Expo
* Rode em emulador iOS (macOS): pressione `i`

#### Configurar comunicação com o backend

No mobile, aponte as requisições para o endereço correto do backend. Se estiver usando o emulador Android, `localhost` refere-se ao emulador — use `10.0.2.2` (Android emulator) ou o IP da sua máquina.



Se estiver no celular físico e o backend rodando na sua máquina, use o IP local da sua máquina `http://192.168.x.y:4000`.


## 5. Recursos úteis

* React Native: [https://reactnative.dev/](https://reactnative.dev/)
* Expo: [https://docs.expo.dev/](https://docs.expo.dev/)
* Express: [https://expressjs.com/](https://expressjs.com/)


