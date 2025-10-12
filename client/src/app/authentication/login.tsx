import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/logo.png";

import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '800', fontSize: 30 }}>Seja bem-vindo à Zap List</Text>
      <Image source={logo} style={styles.logo} />
      <Text style={{ fontWeight: '800', fontSize: 23 }}>Entrar</Text>
      <TextInput style={styles.input} placeholder="email:" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="senha:" placeholderTextColor="#999" />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={{ color: 'white' }}>Entrar</Text>
      </TouchableOpacity>
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
    width: 327,
    alignItems: 'center',
    borderRadius: 8,
  }
})

