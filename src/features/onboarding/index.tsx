import { View, Text, Image, TouchableOpacity, } from 'react-native'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import React, { useState } from 'react'

type OnboardingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
//vetor com as páginas do onboarding
const pages = [
    {
        title: 'Apresentação',
        description: 'Bem-vindo ao PLANPAZ.',
        image: require('../../assets/images/onboarding-1.png'),
    },

    {
        title: 'Cultive suas plantas',
        description: 'Aprenda a cuidar das espécies ideais para você.',
        image: require('../../assets/images/onboarding-2.png'),
    },

    {
        title: 'Compartilhe experiências',
        description: 'Conecte-se com pessoas que também cultivam plantas.',
        image: require('../../assets/images/onboarding-2.png'),
    },
];

export default function OnboardingScreen() {
  //estado para controlar a página atual do onboarding
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const isLastPage = currentPage === pages.length - 1;
  const isFirstPage = currentPage === 0;

  return (
    
    <View style={styles.container}>
      {/*exibe a imagem da página atual do onboarding*/}
      <View style={styles.header}>
        <Image source={pages[currentPage].image} resizeMode="cover" style={styles.banner} />
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>{pages[currentPage].title}</Text>
          <Text style={styles.text}>{pages[currentPage].description}</Text>
        </View>

        {/*Dots de paginação*/}
        <View style={styles.pagination}>
          {pages.map((_, index) => (
            <View key={index}  style={index === currentPage ? styles.paginationDotActive : styles.paginationDot}/>
          ))}
        </View>
        
        {/*Botões de navegação e mudança de estado para mudar a página*/}
        <View style={styles.footer}>
          {currentPage > 0 ? (
            <TouchableOpacity style={styles.previousButton}
              onPress={() => {
                if (!isFirstPage) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <Text style={styles.previousButtonText}>Anterior</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.previousButton} />
          )}

          <TouchableOpacity style={styles.nextButton}
            onPress={() => {
              if (isLastPage) {
                navigation.replace('MainTabs');
              }else{
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