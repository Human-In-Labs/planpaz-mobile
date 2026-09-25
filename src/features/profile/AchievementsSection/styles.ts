import { StyleSheet } from 'react-native';
import {
    colors,
    fonts,
    spacing,
} from '../../../shared/theme';

import {
    scale,
    verticalScale,
} from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(20),
        marginBottom: verticalScale(16),
        paddingHorizontal: scale(spacing.md || 16),
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(12),
    },

    title: {
        fontSize: 20,
        fontFamily: fonts.poppinsBold,
        color: colors.black || '#111827',
        marginRight: scale(6),
    },

    scrollView: {
        width: '100%',
    },

    scrollList: {
        paddingRight: scale(16),
        paddingVertical: verticalScale(4),
        alignItems: 'flex-start',
    },
});