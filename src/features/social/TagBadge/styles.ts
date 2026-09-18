import { StyleSheet } from 'react-native';
import { colors, radius, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D2E6DD',
        borderRadius: radius.xs,
        paddingHorizontal: scale(6),
        paddingVertical: verticalScale(2),
        minHeight: verticalScale(17),
        marginHorizontal: scale(3),
        marginBottom: verticalScale(4),
    },
    iconContainer: {
        width: scale(10),
        height: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(3),
        flexShrink: 0,
    },
    label: {
        ...typography.captionStrong,
        fontSize: 10,
        color: colors.black,
    },
});
