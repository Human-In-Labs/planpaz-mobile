import { View, Text, Image, TextInput, TouchableOpacity, } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { colors } from '../../../shared/theme'
import { styles } from './styles'

type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/auth-banner.png')} resizeMode="cover" style={styles.banner} />
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>Cadastrar</Text>
          <TextInput style={styles.inputEmail} placeholder="Email" placeholderTextColor={colors.black} />
          <TextInput style={styles.inputPassword} placeholder="Password" placeholderTextColor={colors.black} secureTextEntry />
          <TextInput style={styles.inputPassword} placeholder="Confirm Password" placeholderTextColor={colors.black} secureTextEntry />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.registerButton}
            onPress={() => {
              navigation.navigate('MainTabs');
            }}
          >
            <Text style={styles.registerButtonText}>Já tem uma conta?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}