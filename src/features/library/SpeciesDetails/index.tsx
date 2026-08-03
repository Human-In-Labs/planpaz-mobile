import React, { useState } from 'react';
import { ScrollView, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import AppHeader from '../../../shared/components/AppHeader';
import ImageCard from './ImageCard';
import { styles } from './styles';
import DetailsSection from './DetailsSection';
import FloatingActionButton from '../../../shared/components/FloatingActionButton';
import { AppIcons } from '../../../shared/constants/appIcons';

export default function SpeciesDetailsScreen() {
    type NavigationProp =
        NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();
    const [expanded, setExpanded] =
        useState(false);

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <AppHeader
                    title="Jiboia"
                    backButton
                    onBackPress={() =>
                        navigation.goBack()
                    }
                />

                <ImageCard
                    image={require('../../../assets/images/auth-banner.png')}
                    tags={[
                        'Interior',
                        'Pouca água',
                        'Meia sombra',
                    ]}
                    expanded={expanded}
                    onToggle={() =>
                        setExpanded(prev => !prev)
                    }
                />

                {expanded && (
                    <View style={styles.detailsCard}>
                        <DetailsSection
                            commonName="Jiboia"
                            scientificName="Epipremnum aureum"
                            description="A jiboia é uma planta ornamental muito resistente, ideal para ambientes internos. Seu crescimento é rápido e suas folhas possuem um padrão verde vibrante."

                            light="Meia sombra"

                            water="Regar quando o solo estiver seco."
                        />
                    </View>
                )}
            </ScrollView>

            <View style={styles.floatingButton}>
                <FloatingActionButton
                    icon={AppIcons.PLUS}
                    onPress={() => {
                        // TODO
                    }}
                />
            </View>
        </SafeAreaView>
    );
}