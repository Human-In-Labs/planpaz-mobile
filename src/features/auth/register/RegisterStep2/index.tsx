import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../shared/theme';
import { register } from '../../../../shared/api';
import { ErrorPopup } from '../../errors';
import { styles } from './styles';

type RegisterStep2NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegisterStep2'>;
type RegisterStep2RouteProp = RouteProp<RootStackParamList, 'RegisterStep2'>;

export default function RegisterStep2Screen() {
  const navigation = useNavigation<RegisterStep2NavigationProp>();
  const route = useRoute<RegisterStep2RouteProp>();
  const { email, password } = route.params;

  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      await register({
        name: cleanFirstName,
        email,
        password,
      });

      Alert.alert(
        'Cadastro realizado!',
        'Sua conta foi criada com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setErrorMessage('Este email já está cadastrado');
      } else if (error?.response) {
        setErrorMessage('Não foi possível realizar o cadastro');
      } else {
        setErrorMessage('Não foi possível conectar ao servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
            placeholderTextColor={colors.black}
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
            placeholderTextColor={colors.black}
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

        <View style={styles.footer}>
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

      <ErrorPopup visible={!!errorMessage} message={errorMessage} />
    </View>
  );
}
