import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {BidManage, BidManageFinished} from "../screens";
import {Dimensions} from "react-native";

const HEIGHT = Dimensions.get("screen").width;

const Tab = createMaterialTopTabNavigator();

const BidManageTab = () => {
    return (
        <Tab.Navigator
        tabBarOptions={{
            labelStyle: {fontSize: 15, fontWeight: "bold"},
            tabStyle: {height: HEIGHT* 0.135}
        }}>
            <Tab.Screen name="BidManage" component={BidManage} options={{tabBarLabel: "진행중"}}/>
            <Tab.Screen name="BidManageFinished" component={BidManageFinished} options={{tabBarLabel: "마감"}}/>
        </Tab.Navigator>
    );
};

export default BidManageTab;