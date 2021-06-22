import React, {useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import {Main, AuctionBid, AuctionDetail, Auction, Message} from "../screens"


const Stack = createStackNavigator();

const AuctionStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
        initialRouteName="Auction"
        screenOptions={{
            headerTitleAlign: "left",
            cardStyle:{ backgroundColor: theme.backgroundColor},
        }}>
            <Stack.Screen name="Auction" component={Auction} 
                options={{
                    headerBackTitle: false, 
                    headerTitleStyle: {fontSize: 25, fontWeight: 'bold'},
                    headerTitle: "공고 목록", 
                    headerTitleAlign: 'left'}}
            />
            <Stack.Screen name="AuctionDetail" component={AuctionDetail} 
                options={{headerBackTitle: false, headerTitle: ""}}
            />
            <Stack.Screen name="AuctionBid" component={AuctionBid} 
                options={{headerBackTitle: false, headerTitle: "경매 입찰 등록", headerTitleAlign: 'left'}}/>
            <Stack.Screen name = "Message" component={Message} options={{headerTitle: ""}}/>
            <Stack.Screen name="Main" component={Main} />
           
        </Stack.Navigator>
    );
}

export default AuctionStack;