import React from 'react';

export interface Statistic {
    id: string;
    value: number | string;
    label: string;
    icon?: React.ReactNode;
    isHighlighted?: boolean;
}

export interface StatisticsSectionProps {
    statistics?: Statistic[];
    onPress?: () => void;
}