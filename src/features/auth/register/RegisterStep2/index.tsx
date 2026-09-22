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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../shared/theme';
import { register, verificarDisponibilidadeUsername } from '../../../../shared/api';
import ActionFeedbackModal from '../../../../shared/components/ActionFeedbackModal';
import { ErrorPopup } from '../../errors';
import { styles } from './styles';

type RegisterStep2NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegisterStep2'>;
type RegisterStep2RouteProp = RouteProp<RootStackParamList, 'RegisterStep2'>;

export default function RegisterStep2Screen() {
  const navigation = useNavigation<RegisterStep2NavigationProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute<RegisterStep2RouteProp>();
  const { email, password } = route.params;

  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleRegister = async () => {
    const cleanFirstName = firstName.trim();
    const cleanUsername = username.trim();

    if (!cleanFirstName && !cleanUsername) {
      setFirstNameError(true);
      setUsernameError(true);
      setErrorMessage('Preencha todos os campos');
      return;
    }

    if (!cleanFirstName) {
      setFirstNameError(true);
      setUsernameError(false);
      setErrorMessage('Informe seu nome');
      return;
    }

    if (!cleanUsername) {
      setFirstNameError(false);
      setUsernameError(true);
      setErrorMessage('Informe seu nome de usuário');
      return;
    }

    try {
      setLoading(true);
      const isAvailable = await verificarDisponibilidadeUsername(cleanUsername);
      if (!isAvailable) {
        setUsernameError(true);
        setErrorMessage(`Este nome de usuário (@${cleanUsername.replace(/^@/, '')}) já está em uso.`);
        setLoading(false);
        return;
      }

      await register({
        name: cleanFirstName,
        username: cleanUsername,
        email,
        password,
      });

      setSuccessVisible(true);
    } catch (error: any) {
      console.log('[REGISTER] Erro completo no cadastro:', error);
      if (error?.response) {
        console.log('[REGISTER] Status de erro do servidor:', error.response.status, error.response.data);
        const serverMsg =
          error.response.data?.message ||
          error.response.data?.error ||
          (error.response.status === 400 ? 'Este e-mail ou nome de usuário já está cadastrado' : 'Não foi possível realizar o cadastro');
        if (serverMsg.toLowerCase().includes('usuário') || serverMsg.toLowerCase().includes('username')) {
          setUsernameError(true);
        }
        setErrorMessage(serverMsg);
      } else if (error?.request) {
        console.log('[REGISTER] Sem resposta do servidor:', error.request);
        setErrorMessage('Não foi possível conectar ao servidor. Verifique sua conexão ou se a API está online.');
      } else {
        console.log('[REGISTER] Erro de configuração:', error?.message);
        setErrorMessage(error?.customMessage || error?.message || 'Não foi possível realizar o cadastro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <Image
            source={require('../../../../assets/images/auth-banner.png')}
            resizeMode="cover"
            style={styles.banner}
          />
        </View>

        <View style={styles.main}>
          <View style={styles.content}>
            <Text style={styles.title}>Cadastrar</Text>

            <TextInput
              style={[styles.input, firstNameError && styles.inputError]}
              placeholder="Primeiro nome"
              placeholderTextColor={firstNameError && !firstName ? colors.warning : colors.black}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (firstNameError) setFirstNameError(false);
                if (errorMessage) setErrorMessage('');
              }}
              autoCapitalize="words"
              autoCorrect={false}
            />

            <TextInput
              style={[styles.input, usernameError && styles.inputError]}
              placeholder="Nome de usuário"
              placeholderTextColor={usernameError && !username ? colors.warning : colors.black}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (usernameError) setUsernameError(false);
                if (errorMessage) setErrorMessage('');
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ErrorPopup visible={!!errorMessage} message={errorMessage} />
      <ActionFeedbackModal
        visible={successVisible}
        title="Cadastrado com sucesso"
        message="Cadastro realizado! Seu jardim está esperando por você."
        buttonText="Continuar"
        onConfirm={() => {
          setSuccessVisible(false);
          navigation.navigate('Login');
        }}
        onClose={() => {
          setSuccessVisible(false);
          navigation.navigate('Login');
        }}
      />
    </KeyboardAvoidingView>
  );
}
