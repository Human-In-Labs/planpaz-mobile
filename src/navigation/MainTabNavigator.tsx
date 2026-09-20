import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/home';
import SocialNavigator from './SocialNavigator';
import GardenNavigator from './GardenNavigator';
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
                component={SocialNavigator}
            />

            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen
                name="Garden"
                component={GardenNavigator}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
            />
        </Tab.Navigator>
    );
}