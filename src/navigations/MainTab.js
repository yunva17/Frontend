import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main, RegisterAuction, Auction, Store, Mypage} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    return(
        <MaterialIcons
            name={name}
            size={27}
            color={focused ? theme.tabActiveColor : theme.tabIncativeColor}
        />
    );
};

const MainTab = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: theme.tabActiveColor,
                inactiveTintColor: theme.tabIncativeColor,
            }}    
        >
            <Tab.Screen 
                name = "홈" 
                component={Main} 
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: 'home',
                        }),
                }}
            />
            <Tab.Screen 
                name = "경매등록" 
                component={RegisterAuction} 
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: 'control-point',
                        }),
                }}
            />
            <Tab.Screen 
                name = "경매" 
                component={Auction} 
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: 'thumbs-up-down',
                        }),
                }}
            />
            <Tab.Screen 
                name = "업체" 
                component={Store} 
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: 'local-restaurant',
                        }),
                }}
            />
            <Tab.Screen 
                name = "마이페이지" 
                component={Mypage} 
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: 'person',
                        }),
                }}
            />

        </Tab.Navigator>
    );
};

export default MainTab;