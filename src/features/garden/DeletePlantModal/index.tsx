import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { styles } from './styles';

interface DeletePlantModalProps {
    visible: boolean;
    plantName?: string;
    isDeleting?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeletePlantModal({
    visible,
    plantName = 'esta planta',
    isDeleting = false,
    onClose,
    onConfirm,
}: DeletePlantModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {/* Ícone de alerta em vinho / vermelho escuro */}
                    <View style={styles.iconContainer}>
                        <AppIcon
                            icon={AppIcons.WARNING}
                            size={36}
                            color="#8B0000"
                        />
                    </View>

                    {/* Título */}
                    <Text style={styles.title}>Excluir planta?</Text>

                    {/* Mensagem / Descrição */}
                    <Text style={styles.message}>
                        Tem certeza de que deseja excluir{' '}
                        <Text style={styles.plantNameHighlight}>{plantName}</Text>? Essa ação
                        não poderá ser desfeita.
                    </Text>

                    {/* Ações */}
                    <View style={styles.actionsContainer}>
                        {/* Botão Principal: Excluir planta (Vinho / Vermelho Escuro) */}
                        <TouchableOpacity
                            style={styles.primaryButton}
                            activeOpacity={0.8}
                            disabled={isDeleting}
                            onPress={onConfirm}
                        >
                            <Text style={styles.primaryButtonText}>
                                {isDeleting ? 'Excluindo...' : 'Excluir planta'}
                            </Text>
                        </TouchableOpacity>

                        {/* Botão Secundário: Fechar (Link Verde com sublinhado) */}
                        <TouchableOpacity
                            style={styles.secondaryLink}
                            activeOpacity={0.7}
                            disabled={isDeleting}
                            onPress={onClose}
                        >
                            <Text style={styles.secondaryLinkText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
