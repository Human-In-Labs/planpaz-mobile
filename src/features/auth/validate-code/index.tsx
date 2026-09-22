import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../shared/theme';
import { ErrorPopup } from '../errors';
import { styles } from './styles';

type ValidateCodeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ValidateCode'>;

export default function ValidateCodeScreen() {
  const navigation = useNavigation<ValidateCodeNavigationProp>();
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidateCode = () => {
    const cleanCode = code.trim();

    if (!cleanCode) {
      setCodeError(true);
      setErrorMessage('Preencha o código');
      return;
    }

    navigation.navigate('ResetPassword');
  };

  const handleResendCode = () => {
    // Ação de reenvio sem inventar endpoints
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
          <ErrorPopup visible={!!errorMessage} message={errorMessage} />
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
    </View>
  );
}
