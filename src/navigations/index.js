import React,{useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainTab from "./MainTab";
import MypageStack from './MypageStack';
import { Spinner } from '../components';
import { ProgressContext } from '../contexts/Progress';

const Navigation = () => {
    const {inProgress} = useContext(ProgressContext);

    return (
        <NavigationContainer>
            {/* 임의로 MainTab
            <AuthStack/> */}
            <MainTab /> 
            {inProgress&&<Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;