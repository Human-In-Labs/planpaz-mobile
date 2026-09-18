import React from 'react';
import { Text, View, } from 'react-native';
import StatisticCard from '../StatisticCard';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { StatisticsSectionProps, Statistic } from './types';
import { styles } from './styles';

const defaultStatistics: Statistic[] = [
    {
        id: '1',
        value: 84984,
        label: 'CO² capturado',
        icon: <AppIcon icon={AppIcons.CROSSHAIR} size={22} color="#000000" />,
        isHighlighted: true,
    },
    {
        id: '2',
        value: 132978,
        label: 'EcoScore',
        icon: <AppIcon icon={AppIcons.TREE} size={22} color="#000000" />,
    },
    {
        id: '3',
        value: 111555,
        label: 'Dias no Planpaz',
        icon: <AppIcon icon={AppIcons.CALENDAR_DOTS} size={22} color="#000000" />,
    },
    {
        id: '4',
        value: 12,
        label: 'Posts',
        icon: <AppIcon icon={AppIcons.CHAT} size={22} color="#000000" />,
    },
    {
        id: '5',
        value: 132978,
        label: 'Plantas cultivadas',
        icon: <AppIcon icon={AppIcons.PLANT} size={22} color="#000000" />,
    },
];

export default function StatisticsSection({
    statistics = defaultStatistics,
}: StatisticsSectionProps) {
    const list = statistics.length > 0 ? statistics : defaultStatistics;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Estatísticas
                </Text>
            </View>

            <View style={styles.cardsGrid}>
                {list.map((item) => (
                    <StatisticCard
                        key={item.id}
                        value={item.value}
                        label={item.label}
                        icon={item.icon}
                        isHighlighted={item.isHighlighted}
                    />
                ))}
            </View>
        </View>
    );
}