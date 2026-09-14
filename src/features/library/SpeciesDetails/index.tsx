import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, useRoute, RouteProp, } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import AppHeader from '../../../shared/components/AppHeader';
import ImageCard from './ImageCard';
import { styles } from './styles';
import DetailsSection from './DetailsSection';
import FloatingActionButton from '../../../shared/components/FloatingActionButton';
import { AppIcons } from '../../../shared/constants/appIcons';
import { buscarPlantPorId, Plant } from '../../../shared/api/plant';
import { adicionarAoJardim } from '../../../shared/api/garden';
import { traduzirLuminosidade, traduzirRega } from '../../../shared/utils/plant';

type SpeciesDetailsRouteProp = RouteProp<RootStackParamList, 'SpeciesDetails'>;

export default function SpeciesDetailsScreen() {
    type NavigationProp =
        NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<SpeciesDetailsRouteProp>();
    const { speciesId } = route.params;

    const [expanded, setExpanded] = useState(false);
    const [species, setSpecies] = useState<Plant | null>(null);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);

    const carregarEspecie = useCallback(async () => {
        try {
            setLoading(true);
            const data = await buscarPlantPorId(speciesId);
            setSpecies(data);
        } catch (error: any) {
            Alert.alert('Erro', error?.message || 'Não foi possível carregar os detalhes da planta.');
        } finally {
            setLoading(false);
        }
    }, [speciesId]);

    useFocusEffect(useCallback(() => { carregarEspecie(); }, [carregarEspecie]));

    const handleAddToGarden = async () => {
        if (!species) return;

        try {
            setAdding(true);
            await adicionarAoJardim({
                plant: { id: species.id },
                nickname: species.name,
            });

            Alert.alert('Planta adicionada!', `${species.name} agora faz parte do seu jardim.`, [
                { text: 'OK', onPress: () => navigation.navigate('MainTabs') },
            ]);
        } catch (error: any) {
            Alert.alert('Erro', error?.message || 'Não foi possível adicionar a planta ao jardim.');
        } finally {
            setAdding(false);
        }
    };

    if (loading && !species) {
        return (
            <SafeAreaView edges={['top']} style={styles.container}>
                <AppHeader title="Detalhes" backButton onBackPress={() => navigation.goBack()} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            </SafeAreaView>
        );
    }

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
                    title={species?.name ?? 'Detalhes'}
                    backButton
                    onBackPress={() =>
                        navigation.goBack()
                    }
                />

                <ImageCard
                    image={
                        species?.imagePath
                            ? { uri: species.imagePath }
                            : require('../../../assets/images/auth-banner.png')
                    }
                    tags={[
                        traduzirLuminosidade(species?.luminosityLevel),
                        traduzirRega(species?.wateringLevel),
                    ].filter(Boolean)}
                    expanded={expanded}
                    onToggle={() =>
                        setExpanded(prev => !prev)
                    }
                />

                {expanded && species && (
                    <View style={styles.detailsCard}>
                        <DetailsSection
                            commonName={species.name}
                            scientificName={species.scientificName}
                            description={species.description ?? 'Sem descrição disponível.'}
                            light={traduzirLuminosidade(species.luminosityLevel)}
                            water={traduzirRega(species.wateringLevel)}
                        />
                    </View>
                )}
            </ScrollView>

            <View style={styles.floatingButton}>
                <FloatingActionButton
                    icon={AppIcons.PLUS}
                    onPress={handleAddToGarden}
                    disabled={adding || !species}
                />
            </View>
        </SafeAreaView>
    );
}
