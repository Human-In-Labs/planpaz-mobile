import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../shared/theme';
import AppIcon from '../../../shared/components/AppIcon';
import { styles } from './styles';

type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  const handleNext = () => {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password || !confirmPassword) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
      return;
    }

    if (!cleanEmail.includes('@')) {
      Alert.alert('Email inválido', 'Digite um endereço de email válido.');
      return;
    }

    if (!hasMinLength) {
      Alert.alert('Senha inválida', 'A senha deve possuir pelo menos 8 caracteres.');
      return;
    }

    if (!hasNumber) {
      Alert.alert('Senha inválida', 'A senha deve conter pelo menos um número.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Senhas diferentes', 'A senha e a confirmação de senha precisam ser iguais.');
      return;
    }

    navigation.navigate('RegisterStep2', {
      email: cleanEmail,
      password,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/auth-banner.png')}
          resizeMode="cover"
          style={styles.banner}
        />
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>Cadastrar</Text>

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

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor={colors.black}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
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

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirm password"
              placeholderTextColor={colors.black}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowConfirmPassword(prev => !prev)}
            >
              <AppIcon
                icon={showConfirmPassword ? 'eye' : 'eyeSlash'}
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.criteriaContainer}>
            <Text style={styles.criteriaTitle}>Sua senha deve conter:</Text>

            <View style={styles.criteriaRow}>
              <View
                style={[
                  styles.criteriaCircle,
                  hasMinLength && styles.criteriaCircleActive,
                ]}
              />
              <Text
                style={[
                  styles.criteriaText,
                  hasMinLength && styles.criteriaTextActive,
                ]}
              >
                Mínimo de 8 caracteres
              </Text>
            </View>

            <View style={styles.criteriaRow}>
              <View
                style={[
                  styles.criteriaCircle,
                  hasNumber && styles.criteriaCircleActive,
                ]}
              />
              <Text
                style={[
                  styles.criteriaText,
                  hasNumber && styles.criteriaTextActive,
                ]}
              >
                Número
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.alreadyHaveAccountButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.alreadyHaveAccountButtonText}>
              Já possuo conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}