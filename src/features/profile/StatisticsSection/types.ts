export interface Statistic {
    id: string;
    value: number | string;
    label: string;
}

export interface StatisticsSectionProps {
    statistics: Statistic[];
    onPress: () => void;
}