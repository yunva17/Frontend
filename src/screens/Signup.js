import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components/native";
import { Input, Button, Image, RadioButton } from '../components';
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
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const UserView = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${({theme})=> theme.background};
    width: 100%;
`;

const RadioView = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    background-color: ${({theme})=> theme.background};
    width: 100%;
    margin-top: 10px;
`;

const RadioTitle = styled.Text`
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
    color: ${({theme}) => theme.label};
`;

const Signup = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [userName, setuserName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [document, setDocument] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const userNameRef =useRef();
    const ageRef = useRef();
    const didMountRef = useRef();

    useEffect(() => {
        if (didMountRef.current) {
            let _errorMessage = '';
            // 공통 가입 오류 조건
            const errorTest = () =>{
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
                else if (!userName){
                    _errorMessage = "닉네임을 입력하세요.";
                }
                else{
                    _errorMessage = '';
                }
            };

            // 추가 정보 가입 오류 조건
            if(route.params.mode === 'Store'){
                errorTest();
                if(document===null){
                    _errorMessage = "서류를 등록하세요.";
                }
            }
            else if(route.params.mode === 'User'){
                errorTest();
                if(!age){
                    _errorMessage = "나이를 입력하세요.";
                }
                else if(!gender){
                    _errorMessage = "성별을 선택하세요.";
                }
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current = true;
            }
        
    }, [email, password, passwordConfirm, userName, document, age, gender]);
        
        // 회원가입 버튼 활성화
        useEffect(() => {
            if( route.params.mode === 'Store' ){
                setDisabled(            
                    !(userName && email && password && passwordConfirm  && (document!=null) && !errorMessage)
                );
            }
            else{
                setDisabled(            
                    !(userName && email && password && passwordConfirm  && gender && age && !errorMessage)
                ); 
            }
            
        }, [userName, email, password, passwordConfirm, document,gender, age, errorMessage]);

    const _handleSignupButtonPress = () => { };

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
                returnKeyType="next"
                isPassword
            />
            <Input
                ref={passwordConfirmRef}
                label="비밀번호 확인"
                value={passwordConfirm}
                onChangeText={ text => setPasswordConfirm(removeWhitespace(text))}
                onSubmitEditing={() => userNameRef.current.focus()} 
                placeholder="비밀번호를 입력하세요"
                returnKeyType="next"
                isPassword
            /> 
            
            <Input
                ref={userNameRef}
                label="닉네임"
                value={userName}
                onChangeText={ text => setuserName(removeWhitespace(text))}
                onSubmitEditing= { route.params.mode === 'User' ? 
                () => ageRef.current.focus() : null }
                placeholder="닉네임을 입력하세요"
                returnKeyType= { route.params.mode === 'User' ? 
                "next" : "done" }         
            />

            {/* 사용자 성별, 나이 추가 */}
            
            { route.params.mode === 'User' && (
                <UserView>
                    <Input
                        ref={ageRef}
                        label="나이"
                        value={age}
                        onChangeText={ text => setAge(removeWhitespace(text))}
                        placeholder="나이를 입력하세요"
                        returnKeyType= "done"
                        keyboardType="number-pad"
                    />
                    <RadioView>
                        <RadioTitle>성별</RadioTitle>
                        <RadioButton
                            label="남자"
                            value='male'
                            status={ gender === 'male' ? 'checked' : 'unchecked' }
                            onPress={() => setGender('male')}
                        />
                        <RadioButton
                            label="여자"
                            value='female'
                            status={ gender === 'female' ? 'checked' : 'unchecked' }
                            onPress={() => setGender('female')}
                        />
                    </RadioView>
                </UserView>
            )}

            {/* 업체 서류 추가 */}
            { route.params.mode === 'Store' && (
                <Image 
                    label= "서류"
                    url={document}
                    onChangeImage={url => setDocument(url)}
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