import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Overlay from '../../../shared/components/Overlay';
import { styles } from './styles';

interface ReportModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirmReport?: (category: string, details: string) => void;
}

interface ReportCategory {
    id: string;
    title: string;
    description: string;
}

const REPORT_CATEGORIES: ReportCategory[] = [
    {
        id: 'spam',
        title: 'Spam ou Conteúdo Comercial',
        description:
            'Publicações repetitivas, anúncios não autorizados ou links suspeitos.',
    },
    {
        id: 'offensive',
        title: 'Conteúdo Inadequado ou Ofensivo',
        description:
            'Linguagem imprópria, assédio, violência ou desrespeito às regras da comunidade.',
    },
    {
        id: 'misinformation',
        title: 'Informação Falsa ou Enganosa',
        description:
            'Dicas prejudiciais ao cultivo, desinformação botânica ou alegações incorretas.',
    },
];

export default function ReportModal({
    visible,
    onClose,
    onConfirmReport,
}: ReportModalProps) {
    const [stage, setStage] = useState<'categories' | 'confirm'>('categories');
    const [selectedCategory, setSelectedCategory] = useState<ReportCategory | null>(null);
    const [details, setDetails] = useState('');

    useEffect(() => {
        if (visible) {
            setStage('categories');
            setSelectedCategory(null);
            setDetails('');
        }
    }, [visible]);

    const handleSelectCategory = (category: ReportCategory) => {
        setSelectedCategory(category);
        setStage('confirm');
    };

    const handleConfirm = () => {
        if (selectedCategory) {
            onConfirmReport?.(selectedCategory.title, details);
            Alert.alert(
                'Denúncia enviada',
                'Obrigado pelo aviso! Nossa equipe analisará a publicação com base nas diretrizes da comunidade.'
            );
        }
        onClose();
    };

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={styles.container}
        >
            <View style={styles.cardContent}>
                {stage === 'categories' ? (
                    <>
                        {/* Etapa 1: Categorias de Denúncia (DenunciarPost.svg) */}
                        <Text style={styles.title}>
                            Por que você está denunciando?
                        </Text>

                        <View style={styles.categoriesList}>
                            {REPORT_CATEGORIES.map(category => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={styles.categoryCard}
                                    activeOpacity={0.7}
                                    onPress={() => handleSelectCategory(category)}
                                >
                                    <Text style={styles.categoryTitle}>
                                        {category.title}
                                    </Text>
                                    <Text style={styles.categoryDescription}>
                                        {category.description}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                ) : (
                    <>
                        {/* Etapa 2: Confirmação da Denúncia (PopupConfirmarDenuncia.svg) */}
                        <Text style={styles.title}>
                            Você tem certeza que quer denunciar este post?
                        </Text>

                        <Text style={styles.confirmSubtitle}>
                            Se desejar, forneça mais informações abaixo:
                        </Text>

                        <View style={styles.detailsInputContainer}>
                            <TextInput
                                style={styles.detailsInput}
                                value={details}
                                onChangeText={setDetails}
                                placeholder="Detalhes adicionais (opcional)..."
                                placeholderTextColor="#8E8E93"
                                multiline
                            />
                        </View>

                        <View style={styles.actionsRow}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                activeOpacity={0.8}
                                onPress={() => setStage('categories')}
                            >
                                <Text style={styles.cancelButtonText}>
                                    Voltar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.confirmButton}
                                activeOpacity={0.8}
                                onPress={handleConfirm}
                            >
                                <Text style={styles.confirmButtonText}>
                                    Denunciar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Overlay>
    );
}
