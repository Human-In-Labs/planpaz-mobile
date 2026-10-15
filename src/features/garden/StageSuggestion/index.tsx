import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GardenStackParamList } from '../../../navigation/types';
import AppHeader from '../../../shared/components/AppHeader';
import { showFeedback } from '../../../shared/components/FeedbackPopup';
import { editarPlantaDoJardim } from '../../../shared/api';
import { saveIgnoredStageSuggestion } from '../../../shared/services/storage';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'StageSuggestion'>;
type RouteType = RouteProp<GardenStackParamList, 'StageSuggestion'>;

export default function StageSuggestionScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const { plantId, suggestion } = route.params;

    const [saving, setSaving] = useState(false);

    const handleChangeStage = async () => {
        if (saving) return;

        try {
            setSaving(true);
            const res = await editarPlantaDoJardim(plantId, {
                stage: { id: suggestion.suggestedStage.id },
            });
            showFeedback(res?.message || 'Estágio atualizado com sucesso!');
            navigation.goBack();
        } catch (error: any) {
            console.error('[STAGE_SUGGESTION] Erro ao trocar estágio:', error);
            const backendMsg = error?.response?.data?.message || 'Não foi possível trocar o estágio.';
            Alert.alert('Aviso', backendMsg);
        } finally {
            setSaving(false);
        }
    };

    const handleIgnore = async () => {
        if (saving) return;
        await saveIgnoredStageSuggestion(plantId, suggestion.suggestedStage.id);
        navigation.goBack();
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title="Mudança de estágio"
                backButton
                onBackPress={() => navigation.goBack()}
            />

            {/* TODO: comparação de imagens (currentStage x suggestedStage) e mudanças do estágio, conforme Figma */}
            <View style={styles.content} />

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    activeOpacity={0.8}
                    disabled={saving}
                    onPress={handleChangeStage}
                >
                    <Text style={styles.primaryButtonText}>
                        {saving ? 'Salvando...' : 'Trocar de estágio'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryLink}
                    activeOpacity={0.7}
                    disabled={saving}
                    onPress={handleIgnore}
                >
                    <Text style={styles.secondaryLinkText}>Ignorar sugestão</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
