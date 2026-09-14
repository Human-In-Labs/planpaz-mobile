import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../shared/theme';
import AppIcon from '../../../shared/components/AppIcon';
import { ErrorPopup } from '../errors';
import { styles } from './styles';

type ResetPasswordNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
  const navigation = useNavigation<ResetPasswordNavigationProp>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordSubmittedError, setPasswordSubmittedError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  const handleSave = () => {
    if (!password && !confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      setPasswordSubmittedError(!password && (!hasMinLength || !hasNumber));
      setErrorMessage('Preencha todos os campos');
      return;
    }

    if (!password) {
      setPasswordError(true);
      setConfirmPasswordError(false);
      setPasswordSubmittedError(!hasMinLength || !hasNumber);
      setErrorMessage('Preencha a nova senha');
      return;
    }

    if (!confirmPassword) {
      setPasswordError(false);
      setConfirmPasswordError(true);
      setErrorMessage('Confirme a nova senha');
      return;
    }

    if (!hasMinLength || !hasNumber) {
      setPasswordError(true);
      setPasswordSubmittedError(true);
      setConfirmPasswordError(false);
      setErrorMessage('A senha não atende aos requisitos');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      setPasswordSubmittedError(false);
      setErrorMessage('As senhas não coincidem');
      return;
    }

    navigation.navigate('Login');
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
          <Text style={styles.title}>Redefinir</Text>
          <Text style={styles.subtitle}>Digite a nova senha</Text>

          <View style={[styles.inputContainer, passwordError && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={passwordError && !password ? colors.warning : colors.black}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError(false);
                if (passwordSubmittedError) setPasswordSubmittedError(false);
                if (errorMessage === 'As senhas não coincidem') {
                  setConfirmPasswordError(false);
                }
                if (errorMessage) setErrorMessage('');
              }}
              secureTextEntry={!showPassword}
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

          <View style={[styles.inputContainer, confirmPasswordError && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor={confirmPasswordError && !confirmPassword ? colors.warning : colors.black}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (confirmPasswordError) setConfirmPasswordError(false);
                if (errorMessage === 'As senhas não coincidem') {
                  setPasswordError(false);
                }
                if (errorMessage) setErrorMessage('');
              }}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowConfirmPassword(prev => !prev)}
            >
              <AppIcon
                icon={showConfirmPassword ? 'eye' : 'eyeSlash'}
                size={22}
                color={confirmPasswordError ? colors.warning : colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.criteriaContainer}>
            <Text style={styles.criteriaTitle}>Sua senha deve conter:</Text>

            <View style={styles.criteriaRow}>
              <View
                style={[
                  styles.criteriaCircle,
                  hasMinLength
                    ? styles.criteriaCircleActive
                    : passwordSubmittedError
                    ? styles.criteriaCircleError
                    : null,
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
                  hasNumber
                    ? styles.criteriaCircleActive
                    : passwordSubmittedError
                    ? styles.criteriaCircleError
                    : null,
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
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ErrorPopup visible={!!errorMessage} message={errorMessage} />
    </View>
  );
}
