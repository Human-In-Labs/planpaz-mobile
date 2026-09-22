import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type OnboardingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
//vetor com as páginas do onboarding
const pages = [
  {
    title: 'Bem-vindo(a) ao Planpaz!',
    description: 'O aplicativo para quem quer fazer a mudança no mundo, de semente em semente!',
    image: require('../../assets/images/onboarding-1.png'),
  },

  {
    title: 'Seu jardim começa aqui!',
    description: 'Adicione plantas e acompanhe os cuidados de cada uma. Receba lembretes para regar, adubar e manter seu jardim saudável.',
    image: require('../../assets/images/onboarding-2.png'),
  },

  {
    title: 'Faça parte da nossa comunidade!',
    description: 'Compartilhe suas plantas, tire dúvidas e troque experiências com quem também ama cultivar. ',
    image: require('../../assets/images/onboarding-3.png'),
  },
];

export default function OnboardingScreen() {
  //estado para controlar a página atual do onboarding
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const isLastPage = currentPage === pages.length - 1;
  const isFirstPage = currentPage === 0;

  return (

    <View style={styles.container}>
      {/*exibe a imagem da página atual do onboarding*/}
      <View style={styles.header}>
        <Image source={pages[currentPage].image} resizeMode="cover" style={styles.banner} />
      </View>

      <View style={styles.main}>
        {/*Dots de paginação*/}
        <View style={styles.pagination}>
          {pages.map((_, index) => (
            <View key={index} style={index === currentPage ? styles.paginationDotActive : styles.paginationDot} />
          ))}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{pages[currentPage].title}</Text>
          <Text style={styles.text}>{pages[currentPage].description}</Text>
        </View>

        {/*Botões de navegação e mudança de estado para mudar a página*/}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
          {currentPage > 0 ? (
            <TouchableOpacity style={styles.previousButton}
              onPress={() => {
                if (!isFirstPage) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <Text style={styles.previousButtonText}>Voltar</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.previousButton} />
          )}

          <TouchableOpacity style={styles.nextButton}
            onPress={() => {
              if (isLastPage) {
                navigation.replace('Login');
              } else {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <Text style={styles.nextButtonText}>{isLastPage ? 'Começar' : 'Próximo'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}