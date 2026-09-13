import React from 'react';

export interface StatisticCardProps {
    value: number | string;
    label: string;
    icon?: React.ReactNode;
    isHighlighted?: boolean;
}