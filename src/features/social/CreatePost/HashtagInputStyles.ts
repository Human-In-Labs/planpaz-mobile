import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(16),
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(4),
        paddingHorizontal: scale(2),
    },
    label: {
        ...typography.textStrong,
        fontSize: scale(11),
        color: colors.black,
    },
    counter: {
        ...typography.caption,
        fontSize: scale(11),
        color: '#8E8E93',
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: colors.white,
        borderRadius: radius.md,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
        minHeight: verticalScale(36),
        ...shadows.small,
    },
    inputBoxDisabled: {
        backgroundColor: '#F9FAF9',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D2E6DD',
        borderRadius: radius.xs,
        paddingLeft: scale(6),
        paddingRight: scale(4),
        paddingVertical: verticalScale(3),
        marginRight: scale(6),
        marginVertical: verticalScale(2),
    },
    hashIconContainer: {
        width: scale(10),
        height: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(3),
        flexShrink: 0,
    },
    chipText: {
        ...typography.captionStrong,
        fontSize: 11,
        color: colors.black,
    },
    removeButton: {
        width: scale(16),
        height: scale(16),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: scale(4),
    },
    textInput: {
        flex: 1,
        minWidth: scale(100),
        paddingVertical: 0,
        paddingHorizontal: scale(4),
        fontSize: scale(12),
        fontFamily: fonts.interRegular,
        color: colors.black,
        height: verticalScale(26),
    },
});
