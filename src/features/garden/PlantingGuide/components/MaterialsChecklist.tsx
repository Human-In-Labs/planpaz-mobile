import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialsChecklistProps } from '../types';
import { styles } from '../styles';
import AppIcon from '../../../../shared/components/AppIcon';
import { AppIcons } from '../../../../shared/constants/appIcons';
import { colors } from '../../../../shared/theme';

export default function MaterialsChecklist({
    materials,
    checkedItems,
    onToggleItem,
    title,
}: MaterialsChecklistProps) {
    const totalCount = materials.length;
    const checkedCount = materials.filter(m => checkedItems[m.id]).length;

    return (
        <View style={styles.materialsCard}>
            <View style={styles.materialsHeader}>
                <View style={styles.materialsTitleRow}>
                    <AppIcon
                        icon={AppIcons.LIST_DASHES}
                        size={18}
                        color={colors.primary}
                    />
                    <Text style={styles.materialsTitle}>
                        {title || 'Materiais & Preparação'}
                    </Text>
                </View>

                <View style={styles.materialsCounterBadge}>
                    <Text style={styles.materialsCounterText}>
                        {checkedCount}/{totalCount} prontos
                    </Text>
                </View>
            </View>

            {materials.map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.materialItemRow}
                        activeOpacity={0.7}
                        onPress={() => onToggleItem(item.id)}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                isChecked && styles.checkboxChecked,
                            ]}
                        >
                            {isChecked && (
                                <AppIcon
                                    icon={AppIcons.CHECK_CIRCLE}
                                    size={14}
                                    color={colors.white}
                                />
                            )}
                        </View>

                        <View style={styles.materialContent}>
                            <Text
                                style={[
                                    styles.materialName,
                                    isChecked && styles.materialNameChecked,
                                ]}
                            >
                                {item.name}
                            </Text>
                            <Text style={styles.materialDesc}>
                                {item.description}
                            </Text>
                        </View>

                        {item.required ? (
                            <View style={styles.requiredBadge}>
                                <Text style={styles.requiredBadgeText}>
                                    Obrigatório
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.requiredBadge}>
                                <Text
                                    style={[
                                        styles.requiredBadgeText,
                                        { color: colors.textSecondary },
                                    ]}
                                >
                                    Opcional
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}

            <View style={styles.materialsSourceFooter}>
                <AppIcon
                    icon={AppIcons.MAP_PIN}
                    size={14}
                    color={colors.primary}
                />
                <Text style={styles.materialsSourceText}>
                    Onde conseguir: Viveiros especializados, garden centers e lojas de jardinagem (Ref: Sítio da Mata).
                </Text>
            </View>
        </View>
    );
}
