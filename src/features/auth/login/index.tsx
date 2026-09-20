import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../shared/theme';
import { login, getUserSettings } from '../../../shared/api';
import { saveToken, getToken, saveUserId, isUUID } from '../../../shared/services/storage';
import AppIcon from '../../../shared/components/AppIcon';
import { ErrorPopup } from '../errors';
import { styles } from './styles';

type LoginScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Login'>;

const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail && !password) {
      setEmailError(true);
      setPasswordError(true);
      setErrorMessage('Preencha todos os campos');
      return;
    }

    if (!cleanEmail) {
      setEmailError(true);
      setPasswordError(false);
      setErrorMessage('Preencha o e-mail');
      return;
    }

    if (!password) {
      setEmailError(false);
      setPasswordError(true);
      setErrorMessage('Preencha a senha');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setEmailError(true);
      setPasswordError(false);
      setErrorMessage('Formato de e-mail inválido');
      return;
    }

    try {
      console.log('[LOGIN] Botão pressionado');
      console.log('[LOGIN] Email:', cleanEmail);

      const data = await login({
        email: cleanEmail,
        password,
      });

      if (data?.token) {
        await saveToken(data.token);
      }

      try {
        const userSettings = await getUserSettings();
        if (userSettings?.id && isUUID(userSettings.id)) {
          await saveUserId(userSettings.id);
          console.log('[LOGIN] UserId salvo com sucesso:', userSettings.id);
        }
      } catch (userErr) {
        console.log('[LOGIN] Aviso: erro ao buscar dados do usuário após login:', userErr);
      }

      const tokenSalvo = await getToken();

      console.log('[LOGIN] Token salvo:', tokenSalvo);

      console.log('[LOGIN] Login realizado:', data);

      navigation.navigate('MainTabs');
    } catch (error: any) {
      console.log('[LOGIN] Erro completo no login:', error);
      if (error?.response) {
        // Servidor respondeu com código fora da faixa 2xx (ex: 400, 401, 403, 500)
        console.log('[LOGIN] Status de erro do servidor:', error.response.status, error.response.data);
        setEmailError(true);
        setPasswordError(true);
        const backendMessage = error.response.data?.message || error.response.data?.error || 'Credenciais inválidas';
        setErrorMessage(backendMessage);
      } else if (error?.request) {
        // Requisição feita mas sem resposta do servidor (ex: servidor offline, erro de rede/IP)
        console.log('[LOGIN] Sem resposta do servidor:', error.request);
        setEmailError(false);
        setPasswordError(false);
        setErrorMessage('Não foi possível conectar ao servidor. Verifique sua conexão ou se a API está online.');
      } else {
        // Erro na configuração da requisição ou erro de JS
        console.log('[LOGIN] Erro de configuração:', error?.message);
        setEmailError(false);
        setPasswordError(false);
        setErrorMessage(error?.customMessage || error?.message || 'Erro ao processar login.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/auth-banner.png')}
            resizeMode="cover"
            style={styles.banner}
          />
        </View>

        <View style={styles.main}>
          <View style={styles.content}>
            <Text style={styles.title}>Entrar</Text>

            <TextInput
              style={[styles.inputEmail, emailError && styles.inputError]}
              placeholder="Email"
              placeholderTextColor={emailError && !email ? colors.warning : colors.black}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError(false);
                if (errorMessage) setErrorMessage('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={[styles.passwordContainer, passwordError && styles.inputError]}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                placeholderTextColor={passwordError && !password ? colors.warning : colors.black}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError(false);
                  if (errorMessage) setErrorMessage('');
                }}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowPassword(prev => !prev)}
              >
                <AppIcon
                  icon={showPassword ? 'eye' : 'eyeSlash'}
                  size={22}
                  color={passwordError ? colors.warning : colors.primary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
            >
              <Text style={styles.forgotPasswordButtonText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                navigation.navigate('Register');
              }}
            >
              <Text style={styles.registerButtonText}>Não tenho uma conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ErrorPopup visible={!!errorMessage} message={errorMessage} />
    </KeyboardAvoidingView>
  );
}