// 로그인 페이지
import React, {useState, useRef,useEffect} from 'react';
import styled from "styled-components/native";
import {Input,Button, CheckBoxLetter} from "../components";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {validateEmail,removeWhitespace} from "../utils/common";
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

const ErrorText = styled.Text`
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    line-height: 17px;
    color: ${({theme}) => theme.errorText}
`;

const Login = ({navigation}) => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [autoLogin, setAutoLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const passwordRef = useRef();

    useEffect(()=> {setDisabled(!(userId&&password))}, [userId,password]);

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setUserId(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail)? "" : "이메일 형식을 확인하세요."
        );
    };

    const _handleLoginButtonPress = () => {
        //연동되면 코드 추가. 스피너 추가, 로그인 후 계정 인증되면 메인으로 이동되도록.  
    };

    return (
        <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        extraScrollHeight={20}
        >
        <Container>
            <Title>로그인</Title>
            <Input 
            label="이메일" 
            value={userId} 
            onChangeText={_handleEmailChange} 
            onSubmitEditing={() => passwordRef.current.focus()} 
            placeholder="이메일을 입력하세요" 
            returnKeyType="next" 
            />
            <ErrorText>{errorMessage}</ErrorText>
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
            <CheckBoxLetter
            hasIcon={true}
            type={autoLogin? images.checked : images.unchecked}
            title="자동 로그인"
            onPress={() => setAutoLogin(!autoLogin)} />

            <CheckBoxLetter
            hasIcon={false}
            title="아이디/비밀번호 찾기"
            onPress={()=> {navigation.navigate("AccountFind")}}
            />
            </Letter>
            <Button title="로그인" onPress={_handleLoginButtonPress} disabled={disabled}/>
            <Button title="회원가입" onPress={() => {
                navigation.navigate("Mode");
            }}
             />
        </Container>
        </KeyboardAwareScrollView>
    );
};


export default Login;