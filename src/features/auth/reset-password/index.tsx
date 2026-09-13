import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../shared/theme';
import AppIcon from '../../../shared/components/AppIcon';
import { styles } from './styles';

type ResetPasswordNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
  const navigation = useNavigation<ResetPasswordNavigationProp>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
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

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.black}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
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

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor={colors.black}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
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
    </View>
  );
}
