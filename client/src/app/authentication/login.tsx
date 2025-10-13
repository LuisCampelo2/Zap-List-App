import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/logo.png";
import { useDispatch} from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import { login } from '../../slices/userSlice'
import { router } from "expo-router";

import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


export default function loginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = async () => {
    const res = await dispatch(login({ email, password }));

    if (login.fulfilled.match(res)) {
      router.push("/");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '800', fontSize: 30 }}>Seja bem-vindo à Zap List</Text>
      <Image source={logo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="email:"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="senha:"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'white' }}>Não tem conta? Clique aqui</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={{ color: 'white' }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 5,
  },
  logo: {
    width: 90,
    height: 100,
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    width: 327,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: '#000000',
    color: 'white',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20
  },
  footer: {
    flexDirection: 'row',
    width: 327,
    justifyContent: 'space-between'
  }
})

