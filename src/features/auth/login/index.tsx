import { View, Text, Image, TextInput, TouchableOpacity, } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import React from 'react'
import { colors } from '../../../shared/theme'


type LoginScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/auth-banner.png')} resizeMode="cover" style={styles.banner} />
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>Entrar</Text>
          <TextInput style={styles.inputEmail} placeholder="Email" placeholderTextColor={colors.black} />
          <TextInput style={styles.inputPassword} placeholder="Password" placeholderTextColor={colors.black} secureTextEntry />
          <TouchableOpacity style={styles.forgotPasswordButton}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          >
            <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.registerButton}
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            <Text style={styles.registerButtonText}>Não tem uma conta?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}
            onPress={() => {
              navigation.navigate('MainTabs');
            }}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}