import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, } from 'react-native';
import { NativeStackNavigationProp, } from '@react-navigation/native-stack';
import { useNavigation, } from '@react-navigation/native';
import { RootStackParamList, } from '../../../navigation/types';
import { colors, } from '../../../shared/theme';
import { styles, } from './styles';
import { register, } from '../../../shared/api';

type RegisterScreenNavigationProp = NativeStackNavigationProp< RootStackParamList, 'Register' >;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [ name, setName, ] = useState('');
  const [ email, setEmail, ] = useState('');
  const [ password, setPassword, ] = useState('');
  const [ confirmPassword, setConfirmPassword, ] = useState('');
  const [ loading, setLoading, ] = useState(false);

  async function handleRegister() {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    /* VALIDAÇÃO DOS CAMPOS */
    if (
      !cleanName ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.',);
      return;
    }

    /* VALIDAÇÃO DO EMAIL */
    if (
      !cleanEmail.includes('@')
    ) {
      Alert.alert('Email inválido', 'Digite um endereço de email válido.',);
      return;
    }

    /* VALIDAÇÃO DA SENHA */
    if (
      password.length < 6
    ) {
      Alert.alert('Senha inválida', 'A senha deve possuir pelo menos 6 caracteres.',);
      return;
    }

    /* CONFIRMAÇÃO DA SENHA */
    if (
      password !== confirmPassword
    ) {
      Alert.alert('Senhas diferentes', 'A senha e a confirmação de senha precisam ser iguais.',);
      return;
    }

    try {
      setLoading(true);
      console.log('========== CADASTRO ==========',);
      console.log('NOME:', cleanName,);
      console.log('EMAIL:', cleanEmail,);

      /*  CHAMADA DA API : A comunicação HTTP fica centralizada em shared/api. */
      const response =
        await register({
          name: cleanName,
          email: cleanEmail,
          password,
        });

      console.log('CADASTRO REALIZADO:', response,);

      Alert.alert(
        'Cadastro realizado!',
        'Sua conta foi criada com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate(
                'Login',
              );
            },
          },
        ],
      );

    } catch (error: any) {
      console.log('========== ERRO NO CADASTRO ==========',);
      console.log(error,);
      if (error.response) {
        console.log('STATUS:', error.response.status,);
        console.log('DATA:', error.response.data,);
        if (
          error.response.status === 400
        ) {
          Alert.alert('Cadastro não realizado', 'Este email já está cadastrado.',);
        } else {
          Alert.alert('Erro', 'Não foi possível realizar o cadastro.',);
        }
      } else {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique se a API está funcionando.',);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.header}
      >

        <Image
          source={require('../../../assets/images/auth-banner.png')}
          resizeMode="cover"
          style={styles.banner}
        />
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Cadastrar
          </Text>

          <TextInput
            style={styles.inputEmail}
            placeholder="Nome completo"
            placeholderTextColor={colors.black}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <TextInput
            style={styles.inputEmail}
            placeholder="Email"
            placeholderTextColor={colors.black}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            placeholderTextColor={colors.black}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TextInput
            style={styles.inputPassword}
            placeholder="Confirm Password"
            placeholderTextColor={colors.black}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.replace('Login',)}
            disabled={loading}
          >
            <Text
              style={styles.registerButtonText}
            >
              Já tem uma conta?
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text
              style={styles.loginButtonText}
            >
              {
                loading
                  ? 'Cadastrando...'
                  : 'Cadastrar'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}