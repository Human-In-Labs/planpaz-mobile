import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { useState } from 'react'
import React from 'react'
import { colors } from '../../../shared/theme'
import { login } from '../../../shared/api';
import { useAuth } from '../../../shared/contexts/AuthContext';
import AppIcon from '../../../shared/components/AppIcon';


type LoginScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      Alert.alert('Campos obrigatórios', 'Preencha email e senha para continuar.');
      return;
    }

    try {
      setLoading(true);

      await login({
        email: cleanEmail,
        password,
      });

      await refreshUser();

      navigation.navigate('MainTabs');
    } catch (error: any) {
      if (error?.response?.status === 401) {
        Alert.alert('Não foi possível entrar', 'Email ou senha incorretos.');
      } else {
        Alert.alert('Erro', error?.message || 'Não foi possível fazer login.');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/auth-banner.png')} resizeMode="cover" style={styles.banner} />
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>Entrar</Text>

          <TextInput
            style={styles.inputEmail}
            placeholder="Email"
            placeholderTextColor={colors.black}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor={colors.black}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowPassword(prev => !prev)}
            >
              <AppIcon
                icon={showPassword ? 'eye' : 'eyeSlash'}
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPasswordButton}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          >
            <Text style={styles.forgotPasswordButtonText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.registerButton}
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            <Text style={styles.registerButtonText}>Não tenho uma conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}