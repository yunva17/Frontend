import React,{useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainTab from "./MainTab";
import { Spinner } from '../components';
import { ProgressContext } from '../contexts/Progress';
import MainStack from "./MainStack";

const Navigation = () => {
    const {inProgress} = useContext(ProgressContext);

    return (
        <NavigationContainer>
            {/* <AuthStack /> */}
            <MainTab />
            
            {inProgress&&<Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;