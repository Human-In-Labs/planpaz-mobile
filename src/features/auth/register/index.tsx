import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../shared/theme';
import { verticalScale } from '../../../shared/theme/scale';
import AppIcon from '../../../shared/components/AppIcon';
import { ErrorPopup } from '../errors';
import { styles } from './styles';

type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterNavigationProp>();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const activeFieldRef = useRef<'email' | 'password' | 'confirmPassword' | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordSubmittedError, setPasswordSubmittedError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  const scrollToField = (field: 'email' | 'password' | 'confirmPassword') => {
    activeFieldRef.current = field;
    const targetY =
      field === 'confirmPassword'
        ? verticalScale(240)
        : field === 'password'
        ? verticalScale(160)
        : 0;

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
    }, 80);
  };

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      if (activeFieldRef.current === 'confirmPassword') {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: verticalScale(240), animated: true });
        }, 50);
      } else if (activeFieldRef.current === 'password') {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: verticalScale(160), animated: true });
        }, 50);
      }
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
      activeFieldRef.current = null;
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleNext = () => {
    Keyboard.dismiss();
    const cleanEmail = email.trim();

    if (!cleanEmail || !password || !confirmPassword) {
      setEmailError(!cleanEmail);
      setPasswordError(!password);
      setConfirmPasswordError(!confirmPassword);
      setPasswordSubmittedError(!password && (!hasMinLength || !hasNumber));
      setErrorMessage('Preencha todos os campos');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setEmailError(true);
      setPasswordError(false);
      setConfirmPasswordError(false);
      setPasswordSubmittedError(false);
      setErrorMessage('Formato de e-mail inválido');
      return;
    }

    if (!hasMinLength || !hasNumber) {
      setEmailError(false);
      setPasswordError(true);
      setPasswordSubmittedError(true);
      setConfirmPasswordError(false);
      setErrorMessage('A senha não atende aos requisitos');
      return;
    }

    if (password !== confirmPassword) {
      setEmailError(false);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setPasswordSubmittedError(false);
      setErrorMessage('As senhas não coincidem');
      return;
    }

    navigation.navigate('RegisterStep2', {
      email: cleanEmail,
      password,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom:
              keyboardHeight > 0
                ? verticalScale(180)
                : 0,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/onboarding-1.png')}
            resizeMode="cover"
            style={styles.banner}
          />
        </View>

        <View style={styles.main}>
        <View style={styles.content}>
          <ErrorPopup visible={!!errorMessage} message={errorMessage} />
          <Text style={styles.title}>Cadastrar</Text>

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
            onFocus={() => scrollToField('email')}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={[styles.passwordContainer, passwordError && styles.inputError]}>
            <TextInput
              ref={passwordInputRef}
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor={passwordError && !password ? colors.warning : colors.black}
              secureTextEntry={!showPassword}
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
              onFocus={() => scrollToField('password')}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
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

          <View style={[styles.passwordContainer, confirmPasswordError && styles.inputError]}>
            <TextInput
              ref={confirmPasswordInputRef}
              style={styles.inputPassword}
              placeholder="Confirm password"
              placeholderTextColor={confirmPasswordError && !confirmPassword ? colors.warning : colors.black}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (confirmPasswordError) setConfirmPasswordError(false);
                if (errorMessage === 'As senhas não coincidem') {
                  setPasswordError(false);
                }
                if (errorMessage) setErrorMessage('');
              }}
              onFocus={() => scrollToField('confirmPassword')}
              returnKeyType="done"
              onSubmitEditing={handleNext}
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

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}