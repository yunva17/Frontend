// 로그인 페이지
import React, {useState, useRef,useEffect} from 'react';
import styled from "styled-components/native";
import {Input,Button, LoginLetter} from "../components";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {removeWhitespace} from "../utils/common";
import {images} from "../images";

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({theme})=> theme.background};
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: ${({theme}) => theme.titleColor};
    margin-top: 40px;
`;

const Letter = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

const Login = ({navigation}) => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [autoLogin, setAutoLogin] = useState(false);
    const passwordRef = useRef();

    useEffect(()=> {setDisabled(!(userId&&password))}, [userId,password]);

    const _handleLoginButtonPress = () => {};

    return (
        <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        extraScrollHeight={20}
        >
        <Container>
            <Title>로그인</Title>
            <Input 
            label="아이디" 
            value={userId} 
            onChangeText={text => setUserId(removeWhitespace(text))} 
            onSubmitEditing={() => passwordRef.current.focus()} 
            placeholder="아이디를 입력하세요" 
            returnKeyType="next" 
            disabled={disabled}/>
            <Input 
            ref={passwordRef} 
            label="비밀번호" 
            value={password} 
            onChangeText={text=> setPassword(removeWhitespace(text))} 
            onSubmitEditing={_handleLoginButtonPress} 
            placeholder="비밀번호를 입력하세요" 
            returnKeyType="done" 
            isPassword />

            <Letter>
            <LoginLetter
            hasIcon={true}
            type={autoLogin? images.checked : images.unchecked}
            title="자동 로그인"
            onPress={() => setAutoLogin(!autoLogin)} />

            <LoginLetter
            hasIcon={false}
            title="계정 찾기"
            onPress={()=> {}}
            />
            </Letter>
            <Button title="로그인" onPress={_handleLoginButtonPress} />
            <Button title="회원가입" onPress={() => {
                navigation.navigate("Signup");
            }}
            isFilled={false} />
        </Container>
        </KeyboardAwareScrollView>
    );
};


export default Login;