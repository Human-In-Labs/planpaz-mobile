import { ActivityCardData } from '../../../../shared/types/activity';

export interface ActivityCardProps {

    activity: ActivityCardData;
    onPress?: (activity: ActivityCardData) => void;

}