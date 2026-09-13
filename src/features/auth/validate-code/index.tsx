import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../shared/theme';
import { styles } from './styles';

type ValidateCodeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ValidateCode'>;

export default function ValidateCodeScreen() {
  const navigation = useNavigation<ValidateCodeNavigationProp>();
  const [code, setCode] = useState('');

  const handleValidateCode = () => {
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
          <Text style={styles.title}>Validar</Text>
          <Text style={styles.subtitle}>
            Digite o código enviado por Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Código"
            placeholderTextColor={colors.black}
            value={code}
            onChangeText={setCode}
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
