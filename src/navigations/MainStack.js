import React, { useContext } from 'react';
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main, StoreDetail, Message, Notice, Review, AuctionDetail, AuctionBid } from "../screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Stack = createStackNavigator();

const MainStack = ({ navigation }) => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTitleAlign: "left",
                cardStyle: { backgroundColor: theme.background },
                headerBackTitleVisible: false,
                headerBackImage: () => {
                    return (
                        <MaterialCommunityIcons name="keyboard-backspace" size={30} />
                    );
                },
            }}>
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="StoreDetail" component={StoreDetail}
                options={{ headerTitle: " ", headerStyle: { elevation: 0 } }} />
            <Stack.Screen name="AuctionDetail" component={AuctionDetail}
                options={{ headerTitle: " ", headerStyle: { elevation: 0 } }} />
            <Stack.Screen name="Message" component={Message} options={{ headerTitle: "" }} />
            <Stack.Screen name="Notice" component={Notice} options={{ headerTitle: "알림 목록", headerTitleAlign: 'left', headerTitleStyle: { fontSize: 25, fontWeight: 'bold' } }} />
            <Stack.Screen name="Review" component={Review} options={{ headerTitle: "리뷰", headerTitleAlign: 'left', headerTitleStyle: { fontSize: 25, fontWeight: 'bold' } }} />
            <Stack.Screen name="AuctionBid" component={AuctionBid}
                options={{ headerBackTitle: false, headerTitle: "경매 입찰 등록", headerTitleAlign: 'left' }} />
        </Stack.Navigator>
    );
};

export default MainStack;