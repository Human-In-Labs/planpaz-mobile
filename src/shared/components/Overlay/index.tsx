import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import AppIcon from '../AppIcon';
import { AppIcons } from '../../constants/appIcons';
import { colors } from '../../theme';

import { styles } from './styles';
import { OverlayProps } from './types';

export default function Overlay({
    visible,
    onClose,
    children,
}: OverlayProps) {

    if (!visible) return null;

    return (

        <TouchableWithoutFeedback onPress={onClose}>

            <SafeAreaView
                edges={['top']}
                style={styles.overlay}
            >
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <AppIcon
                            icon={AppIcons.X}
                            size={22}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback>

                    <View style={styles.container}>
                        {children}
                    </View>

                </TouchableWithoutFeedback>

            </SafeAreaView>

        </TouchableWithoutFeedback>

    );

}