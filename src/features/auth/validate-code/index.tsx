import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { verticalScale } from '../../../shared/theme/scale';
import { colors } from '../../../shared/theme';
import { ErrorPopup } from '../errors';
import { styles } from './styles';

import RateLimitModal from '../../../shared/components/RateLimitModal';
import { validarCodigoRecuperacao, solicitarRecuperacaoSenha } from '../../../shared/api/auth';

type ValidateCodeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ValidateCode'>;
type ValidateCodeRouteProp = RouteProp<RootStackParamList, 'ValidateCode'>;

export default function ValidateCodeScreen() {
  const navigation = useNavigation<ValidateCodeNavigationProp>();
  const route = useRoute<ValidateCodeRouteProp>();
  const email = route.params?.email || '';

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rateLimitModalVisible, setRateLimitModalVisible] = useState(false);

  const handleValidateCode = async () => {
    const cleanCode = code.trim();

    if (!cleanCode) {
      setCodeError(true);
      setErrorMessage('Preencha o código');
      return;
    }

    setLoading(true);
    try {
      await validarCodigoRecuperacao(email, cleanCode);
      navigation.navigate('ResetPassword', { email, code: cleanCode });
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Código inválido ou expirado.';
      setCodeError(true);
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setErrorMessage('E-mail não identificado para reenvio.');
      return;
    }
    try {
      await solicitarRecuperacaoSenha(email);
      Alert.alert(
        'Código Reenviado!',
        'Confira sua caixa de entrada para obter o novo código.'
      );
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || '';
      if (msg.includes('RATE_LIMIT_EXCEEDED') || msg.includes('15 minutos') || msg.includes('recentemente')) {
        setRateLimitModalVisible(true);
      } else {
        setErrorMessage(msg || 'Erro ao reenviar código.');
      }
    }
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
          <ErrorPopup
            visible={!!errorMessage}
            message={errorMessage}
            areaHeight={verticalScale(82)}
          />
          <Text style={styles.title}>Validar</Text>
          <Text style={styles.subtitle}>
            Digite o código enviado por Email
          </Text>

          <TextInput
            style={[styles.input, codeError && styles.inputError]}
            placeholder="Código"
            placeholderTextColor={colors.black}
            value={code}
            onChangeText={(text) => {
              setCode(text);
              if (codeError) setCodeError(false);
              if (errorMessage) setErrorMessage('');
            }}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendCode}
          >
            <Text style={styles.resendButtonText}>Reenviar Código</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.validateButton}
            onPress={handleValidateCode}
          >
            <Text style={styles.validateButtonText}>Validar código</Text>
          </TouchableOpacity>
        </View>
      </View>
      <RateLimitModal
        visible={rateLimitModalVisible}
        onClose={() => setRateLimitModalVisible(false)}
      />
    </View>
  );
}
