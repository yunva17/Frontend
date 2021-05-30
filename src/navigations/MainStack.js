import React, {useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Main, RegisterAuction} from "../screens";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const Stack = createStackNavigator();

const MainStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{
            headerTitleAlign: "left",
            cardStyle: {backgroundColor: theme.background},
            headerBackTitleVisible: false,
            headerBackImage: () => {
                return(
                    <MaterialCommunityIcons name="keyboard-backspace" size={30}/>
                );
            },
        }}>
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterAuction" component={RegisterAuction} 
            options={{
                headerTitle: "경매 공고 등록",
                headerTitleStyle: {fontSize: 25, fontWeight: 'bold'},
                headerBackTitle: false,
                headerTitleAlign: "left",
                }}/>
        </Stack.Navigator>
    );
};

export default MainStack;