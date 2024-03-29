import React,{useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main, Auction, Store, Mypage} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import MypageStack from './MypageStack';
import RegisterAuctionStack from "./RegisterAuctionStack";
import MainStack from './MainStack';
import AuctionListTab from './AuctionListTab';
import AuctionListStack from './AuctionListStack';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    return(
        <MaterialIcons
            name={name}
            size={28}
            color={focused ? theme.tabActiveColor : theme.tabIncativeColor}
        />
    );
};

const MainTab = ({navigation}) => {
    

    return(
        <Tab.Navigator
            initialRouteName="홈"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: theme.tabActiveColor,
                inactiveTintColor: theme.tabIncativeColor,
                labelStyle: {
                    fontSize: 15,
                    marginTop: 5,
                    marginBottom: 5,
                  },
                style : {
                    height: 60,
                    paddingTop: 10,
                },  
            }}    
        >
            <Tab.Screen 
                name = "홈" 
                component={MainStack} 
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: 'home',
                        }),
                        unmountOnBlur: true,
                }}
                listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ screen: undefined }),
                })}
            />
            <Tab.Screen 
                name = "경매등록" 
                component={RegisterAuctionStack} 
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: 'control-point',
                        }),
                        unmountOnBlur: true,
                }}
                listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ screen: undefined }),
                })}
            />
            <Tab.Screen 
                name = "경매" 
                component={AuctionListStack} 
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: 'thumbs-up-down',
                        }),
                        unmountOnBlur: true,
                }}
                listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ screen: undefined }),
                })}
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
                        unmountOnBlur: true,
                }}
                listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ screen: undefined }),
                })}
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
                        unmountOnBlur: true,
                }}
                listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ screen: undefined }),
                })}
            />

        </Tab.Navigator>
    );
};

export default MainTab;