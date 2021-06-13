import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main, RegisterAuction, Auction, Store, Mypage} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import MypageStack from './MypageStack';
import AuctionStack from './AuctionStack'

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    return(
        <MaterialIcons
            name={name}
            size={29}
            color={focused ? theme.tabActiveColor : theme.tabIncativeColor}
        />
    );
};

const MainTab = () => {
    return(
        <Tab.Navigator
            initialRouteName="홈"
            tabBarOptions={{
                activeTintColor: theme.tabActiveColor,
                inactiveTintColor: theme.tabIncativeColor,
                labelStyle: {
                    fontSize: 15,
                  },
                style : {
                    height: 55,
                },
                  
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
                component={AuctionStack} 
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
                component={MypageStack} 
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