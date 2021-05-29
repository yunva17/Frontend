import React, {useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Main} from "../screens";

const Stack = createStackNavigator();

const MainStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{
            headerTitleAlign: "center",
            cardStyle: {backgroundColor: theme.background},
            headerBackTitleVisible: false,
        }}>
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default MainStack;