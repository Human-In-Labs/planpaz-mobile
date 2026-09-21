import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Overlay from '../../../shared/components/Overlay';
import {
    enviarDenuncia,
    ReportContentType,
    ReportReason,
} from '../../../shared/api';
import { styles } from './styles';

interface ReportModalProps {
    visible: boolean;
    onClose: () => void;
    contentType?: ReportContentType;
    contentId?: string;
    onConfirmReport?: (reason: ReportReason, message: string) => void;
}

interface ReportCategory {
    id: ReportReason;
    title: string;
    description: string;
}

const REPORT_CATEGORIES: ReportCategory[] = [
    {
        id: 'HATE_SPEECH',
        title: 'Discurso de ódio',
        description:
            'Preconceito, discriminação, ataques pessoais ou violência verbal.',
    },
    {
        id: 'UNAUTHORIZED_DISCLOSURE',
        title: 'Divulgação indevida',
        description:
            'Vazamento de informações pessoais, imagens não autorizadas ou dados privados.',
    },
    {
        id: 'SPAM',
        title: 'Spam ou Golpes',
        description:
            'Publicações repetitivas, anúncios não autorizados, ofertas falsas ou links suspeitos.',
    },
    {
        id: 'INAPPROPRIATE_CONTENT',
        title: 'Conteúdo inapropriado',
        description:
            'Linguagem imprópria, assédio ou desrespeito às regras da comunidade PlanPaz.',
    },
];

export default function ReportModal({
    visible,
    onClose,
    contentType = 'POST',
    contentId,
    onConfirmReport,
}: ReportModalProps) {
    const [stage, setStage] = useState<'categories' | 'confirm'>('categories');
    const [selectedCategory, setSelectedCategory] = useState<ReportCategory | null>(null);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (visible) {
            setStage('categories');
            setSelectedCategory(null);
            setMessage('');
            setIsSubmitting(false);
        }
    }, [visible]);

    const handleSelectCategory = (category: ReportCategory) => {
        setSelectedCategory(category);
        setStage('confirm');
    };

    const handleConfirm = async () => {
        if (!selectedCategory) return;

        if (contentId) {
            try {
                setIsSubmitting(true);
                await enviarDenuncia({
                    contentType,
                    contentId,
                    reason: selectedCategory.id,
                    message: message.trim() || undefined,
                });

                onConfirmReport?.(selectedCategory.id, message);

                Alert.alert(
                    'Denúncia Enviada',
                    'Agradecemos a sua denúncia. Nossa equipe de moderação irá analisar o conteúdo.',
                    [{ text: 'OK', onPress: onClose }]
                );
            } catch (error: any) {
                console.error('[REPORT MODAL] Erro ao enviar denúncia:', error);
                const errMsg =
                    error?.response?.data?.message ||
                    'Não foi possível enviar sua denúncia. Tente novamente.';
                Alert.alert('Aviso', errMsg);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            onConfirmReport?.(selectedCategory.id, message);
            Alert.alert(
                'Denúncia Enviada',
                'Agradecemos a sua denúncia. Nossa equipe de moderação irá analisar o conteúdo.'
            );
            onClose();
        }
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
                        {/* Etapa 1: Categorias de Denúncia */}
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
                        {/* Etapa 2: Confirmação da Denúncia com Mensagem Opcional */}
                        <Text style={styles.title}>
                            Confirmar denúncia de {contentType === 'POST' ? 'post' : 'comentário'}?
                        </Text>

                        <Text style={styles.confirmSubtitle}>
                            Motivo: {selectedCategory?.title}
                        </Text>

                        <View style={styles.detailsInputContainer}>
                            <TextInput
                                style={styles.detailsInput}
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Descreva mais detalhes (opcional)..."
                                placeholderTextColor="#8E8E93"
                                multiline
                                maxLength={300}
                            />
                        </View>

                        <View style={styles.actionsRow}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                activeOpacity={0.8}
                                onPress={() => setStage('categories')}
                                disabled={isSubmitting}
                            >
                                <Text style={styles.cancelButtonText}>
                                    Voltar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.confirmButton, isSubmitting && { opacity: 0.6 }]}
                                activeOpacity={0.8}
                                onPress={handleConfirm}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.confirmButtonText}>
                                        Denunciar
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Overlay>
    );
}
