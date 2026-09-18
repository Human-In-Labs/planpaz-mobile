import { StyleSheet } from 'react-native';

import {
    colors,
    radius,
    typography,
} from '../../../../shared/theme';

import {
    scale,
    verticalScale,
} from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(32),
        paddingHorizontal: scale(16),
    },

    section: {
        alignItems: 'center',
    },

    sectionSpacing: {
        marginTop: verticalScale(16),
    },

    title: {
        ...typography.bodyMedium2,
        textAlign: 'center',
        marginBottom: verticalScale(4),
    },

    optionsContainer: {
        width: scale(326),
        minHeight: verticalScale(32),
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: scale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: scale(4),
    },

    option: {
        minWidth: scale(60),
        paddingHorizontal: scale(5),
        height: verticalScale(22),
        borderRadius: scale(8),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },

    selectedBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: scale(8),
        backgroundColor: colors.primary,
    },

    optionText: {
        ...typography.textSuccess,
        textAlign: 'center',
        zIndex: 1,
    },

    selectedOptionText: {
        ...typography.textWhite,
    },
});