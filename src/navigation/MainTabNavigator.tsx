import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/home';
import SocialScreen from '../features/social';
import GardenScreen from '../features/garden';
import ProfileNavigator from './ProfileNavigator';
import BottomTabBar from '../shared/components/TabBar';

export type MainTabParamList = {
    Social: undefined;
    Home: undefined;
    Garden: undefined;
    Profile: undefined;
};

function renderTabBar(props: BottomTabBarProps) {
    return <BottomTabBar {...props} />;
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
            tabBar={renderTabBar}
        >
            <Tab.Screen
                name="Social"
                component={SocialScreen}
            />

            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen
                name="Garden"
                component={GardenScreen}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
            />
        </Tab.Navigator>
    );
}