import { StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 8,
        borderRadius: 16,
        padding: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: 'rgba(17, 86, 52, 0.15)',
    },
    containerRain: {
        backgroundColor: '#E0F2FE',
        borderColor: '#7DD3FC',
    },
    containerDry: {
        backgroundColor: '#FEF3C7',
        borderColor: '#FCD34D',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    leftHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.primaryDark,
        flex: 1,
    },
    titleRain: {
        color: '#0369A1',
    },
    titleDry: {
        color: '#B45309',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: colors.primary,
    },
    badgeRain: {
        backgroundColor: '#0284C7',
    },
    badgeDry: {
        backgroundColor: '#D97706',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.white,
    },
    instructionText: {
        fontSize: 13,
        lineHeight: 18,
        color: '#1F2937',
        fontWeight: '500',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 8,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0, 0, 0, 0.08)',
        gap: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
});
