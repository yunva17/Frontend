import React, {useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import Mypage from "../screens/Mypage";
import StoreInfo from "../screens/StoreInfo";


const Stack = createStackNavigator();

const MypageStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        initialRouteName="Mypage"
        screenOptions={{
            headerTitleAlign: "center",
            cardStyle:{ backgroundColor: theme.backgroundColor},
        }}>
            <Stack.Screen name="Mypage" component={Mypage} 
                options={{headerBackTitle: false, headerTitle: "My Page", headerTitleAlign: 'left',  headerTitleStyle: {fontSize: 25, fontWeight: 'normal'},}}
            />
            <Stack.Screen name="StoreInfo" component={StoreInfo} options={{headerBackTitle: false, headerTitle: " "}}/>
        </Stack.Navigator>
    );
}

export default MypageStack;