// 사용자/업체 모드 선택 페이지  
import React, {useState} from 'react';
import styled from "styled-components/native";
import {ModeButton} from "../components";

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({theme})=> theme.background};
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: ${({theme}) => theme.titleColor};
    padding: 50px;
`;

const Mode = ({navigation}) => {
    const [mode,setMode] = useState('');

    return (
        <Container>
            <Title>회식 모아</Title>
            <ModeButton title= "User"
                onPress={() => {
                setMode('User');
                navigation.navigate("Signup",{ mode: 'User' });
            }}
            containerStyle={{marginBottom: 60}}
            />
            <ModeButton title= "Store"
                onPress={() => {
                setMode('Store');
                navigation.navigate("Signup",{ mode: 'Store' });
            }}/>
        </Container>
    );
};

export default Mode;