import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safeArea: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: verticalScale(200),
    },
    commentsContainer: {
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        marginHorizontal: scale(16),
        marginTop: verticalScale(12),
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(24),
        paddingBottom: verticalScale(24),
        ...shadows.small,
    },
    commentsTitle: {
        ...typography.textStrong,
        fontSize: 15,
        color: colors.black,
        marginBottom: verticalScale(16),
    },
    floatingButton: {
        position: 'absolute',
        right: scale(16),
        bottom: verticalScale(106),
    },
});
