// 로그인 및 사용자 인증을 위한 스택 네비게이션
import React, {useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Mode,Login,Signup, AccountFind} from "../screens";
import {MaterialCommunityIcons} from "@expo/vector-icons";
 
const Stack = createStackNavigator();

const AuthStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerTitleAlign: "center",
            cardStyle:{ backgroundColor: theme.backgroundColor},
            headerStyle: {elevation: 0},
            headerBackImage: () => {
                return(
                    <MaterialCommunityIcons name="keyboard-backspace" size={30}/>
                );
            },
        }}>
            
            <Stack.Screen name="Login" component={Login} options={{headerBackTitle: false, headerTitle: " "}} />
            <Stack.Screen name="Signup" component={Signup} options={{headerBackTitle: false, headerTitle: " "}}/>
<<<<<<< HEAD
            <Stack.Screen name="Mode" component={Mode} options={{headerShown: false}}/>
=======
            <Stack.Screen name="Mode" component={Mode} options={{headerBackTitle: false, headerTitle:" "}}/>
            <Stack.Screen name = "AccountFind" component={AccountFind} options={{headerBackTitle: false, headerTitle:" "}}/>
>>>>>>> 5ab8a157a1f549411e6a9f2ff2979f7957b61837
        </Stack.Navigator>
    );
};

export default AuthStack;