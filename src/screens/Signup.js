import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components/native";
import { Input,Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace, validatePassword } from '../utils/common';


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=> theme.background};
    padding: 40px 20px;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: ${({theme}) => theme.titleColor};
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;


const Signup = ({ navigation, route }) => {

    const [userId, setuserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [document, setDocument] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    
    const userIdRef =useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const documentRef = useRef();
    const didMountRef = useRef();

    useEffect(() => {

        if (didMountRef.current) {
            let _errorMessage = '';
            if(!email){
                _errorMessage = "이메일을 입력하세요.";
            }
            else if (!validateEmail(email)) {
                _errorMessage = "이메일을 확인하세요.";
            }
            else if(!password){
                _errorMessage = "비밀번호를 입력하세요.";
            }
            // 비밀번호 영문, 숫자, 특문 1개 포함 8~16자리
            else if (!validatePassword(password)) {
                _errorMessage = "비밀번호 조건을 확인하세요.";
            }
            else if (password !== passwordConfirm){
                _errorMessage = "비밀번호를 확인하세요.";
            }
            else if (!userId){
                _errorMessage = "닉네임을 입력하세요.";
            } else{
                _errorMessage = '';
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current = true;
            }
        
    }, [email, password, passwordConfirm, userId]);

        useEffect(() => {
            setDisabled(            
                !(userId && email && password && passwordConfirm && !errorMessage)
            );
        }, [userId, email, password, passwordConfirm, errorMessage]);

    const _handleSignupButtonPress = () => {};

    return (
        <KeyboardAwareScrollView
        extraScrollHeight={20}
        >
        <Container>
            <Title>회원가입</Title>
            
            <Input
                label="이메일"
                value={email}
                onChangeText={ text => setEmail(removeWhitespace(text))}
                onSubmitEditing={() => passwordRef.current.focus()} 
                placeholder="이메일을 입력하세요"
                returnKeyType="next"
            />
            <Input
                ref={passwordRef}
                label="비밀번호 (특수문자, 숫자, 영문 포함 8자-16자 내외)"
                value={password}
                onChangeText={ text => setPassword(removeWhitespace(text))}
                onSubmitEditing={() => passwordConfirmRef.current.focus()} 
                placeholder="비밀번호를 입력하세요"
                returnKeyType="done"
                isPassword
            />
            <Input
                ref={passwordConfirmRef}
                label="비밀번호 확인"
                value={passwordConfirm}
                onChangeText={ text => setPasswordConfirm(removeWhitespace(text))}
                onSubmitEditing={() => userIdRef.current.focus()} 
                placeholder="비밀번호를 입력하세요"
                returnKeyType="next"
                isPassword
            /> 
            
            <Input
                ref={userIdRef}
                label="닉네임"
                value={userId}
                onChangeText={ text => setuserId(removeWhitespace(text))}
                onSubmitEditing= {_handleSignupButtonPress}
                placeholder="닉네임을 입력하세요"
                returnKeyType= {route.params.mode === 'Store' ? "next" : "done"}
            />
            
            { route.params.mode === 'Store' && (
                <Input
                    ref={documentRef}
                    label="서류 등록"
                    value={document}
                    onSubmitEditing={_handleSignupButtonPress} 
                    placeholder="서류를 등록하세요"
                    returnKeyType="done"
            />
            
            )}
            <ErrorText>{errorMessage}</ErrorText>
            <Button
                title="회원가입"
                onPress={_handleSignupButtonPress}
                disabled={disabled}
            />

        </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;