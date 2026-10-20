import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StepCardProps } from '../types';
import { styles } from '../styles';
import AppIcon from '../../../../shared/components/AppIcon';
import { AppIcons } from '../../../../shared/constants/appIcons';
import { colors } from '../../../../shared/theme';

export default function StepCard({
    steps,
    currentStepIndex,
    onNext,
    onPrev,
    onSelectStep,
}: StepCardProps) {
    const totalSteps = steps.length;
    const currentStep = steps[currentStepIndex] || steps[0];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === totalSteps - 1;

    return (
        <View style={styles.stepperCard}>
            {/* Segmented Progress Bar */}
            <View style={styles.segmentedProgressRow}>
                {steps.map((step, idx) => {
                    const isActive = idx <= currentStepIndex;
                    return (
                        <TouchableOpacity
                            key={step.id}
                            style={[
                                styles.segmentBar,
                                isActive && styles.segmentBarActive,
                            ]}
                            activeOpacity={0.8}
                            onPress={() => onSelectStep(idx)}
                        />
                    );
                })}
            </View>

            {/* Step Header */}
            <View style={styles.stepHeaderRow}>
                <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberBadgeText}>
                        Passo {currentStepIndex + 1} de {totalSteps}
                    </Text>
                </View>

                <View style={styles.stepShortBadge}>
                    <Text style={styles.stepShortBadgeText}>
                        {currentStep.badge}
                    </Text>
                </View>
            </View>

            {/* Central Illustrative Card */}
            <View style={styles.stepIllustrationCard}>
                <View style={styles.stepIllustrationIconWrap}>
                    <AppIcon
                        icon={currentStep.icon}
                        size={28}
                        color={colors.primary}
                    />
                </View>
                <Text style={styles.stepTitle}>{currentStep.title}</Text>
            </View>

            {/* Step Detailed Description */}
            <Text style={styles.stepDescription}>
                {currentStep.description}
            </Text>

            {/* Bullet Points for Step Execution */}
            <View style={styles.detailedInstructionsList}>
                {currentStep.detailedInstructions.map((instruction, idx) => (
                    <View key={idx} style={styles.instructionItemRow}>
                        <View style={styles.instructionBullet} />
                        <Text style={styles.instructionItemText}>
                            {instruction}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Pro Tip Pill */}
            {currentStep.proTip && (
                <View style={styles.proTipCard}>
                    <Text style={styles.proTipLabel}>💡 Dica prática</Text>
                    <Text style={styles.proTipText}>{currentStep.proTip}</Text>
                </View>
            )}

            {/* Caution Alert */}
            {currentStep.caution && (
                <View style={styles.cautionCard}>
                    <Text style={styles.cautionLabel}>⚠️ Atenção Crítica</Text>
                    <Text style={styles.cautionText}>{currentStep.caution}</Text>
                </View>
            )}

            {/* Stepper Navigation Buttons */}
            <View style={styles.stepperControlsRow}>
                <TouchableOpacity
                    style={[
                        styles.stepperBtnSecondary,
                        isFirstStep && styles.stepperBtnSecondaryDisabled,
                    ]}
                    activeOpacity={0.7}
                    disabled={isFirstStep}
                    onPress={onPrev}
                >
                    <AppIcon
                        icon={AppIcons.CARET_LEFT}
                        size={16}
                        color={isFirstStep ? '#A4BEB0' : colors.primary}
                    />
                    <Text
                        style={[
                            styles.stepperBtnSecondaryText,
                            isFirstStep && { color: '#A4BEB0' },
                        ]}
                    >
                        Anterior
                    </Text>
                </TouchableOpacity>

                <Text style={styles.stepperStepCounterText}>
                    {currentStepIndex + 1}/{totalSteps}
                </Text>

                <TouchableOpacity
                    style={styles.stepperBtnPrimary}
                    activeOpacity={0.85}
                    onPress={onNext}
                >
                    <Text style={styles.stepperBtnPrimaryText}>
                        {isLastStep ? 'Concluir' : 'Próximo'}
                    </Text>
                    <AppIcon
                        icon={isLastStep ? AppIcons.CHECK_CIRCLE : AppIcons.CHEVRON_RIGHT}
                        size={16}
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
