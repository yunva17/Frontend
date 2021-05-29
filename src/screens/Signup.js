import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components/native";
import { Input,Button,Image } from '../components';
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

const CheckBoxContainer = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
`;

const ImageContainer = styled.View`
    margin: 20px;
    width: 100%;
    height: 250px;
    background-color:  ${({theme})=> theme.imageBackground};
`;

const Signup = ({ navigation, route }) => {

    const [userId, setuserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [emailValidated, setEmailValidated] = useState(false);
    const [age, setAge] = useState("");
    const [isMan, setIsMan] = useState(false); 
    const [isWoman, setIsWoman] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(null);
    //증명 서류 사진 변수

    const userIdRef =useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const didMountRef = useRef();
    const ageRef = useRef();
    
    useEffect(() => {

        if (didMountRef.current) {
            let _errorMessage = '';
            if(!email){
                _errorMessage = "이메일을 입력하세요.";
            }
            else if (!validateEmail(email)) {
                _errorMessage = "이메일 형식을 확인하세요.";
            }else if (!emailValidated){
                _errorMessage = "이메일을 인증하세요.";
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
            }
            else if(route.params.mode === "User"){
                if(isMan===false && isWoman==false){
                    _errorMessage = "성별을 입력하세요.";
                }
                if(!age){
                    _errorMessage = "나이를 입력하세요.";
                }
            } 
            else if(route.params.mode === "Store"){
                if(!photoUrl) {
                    _errorMessage = "서류를 등록하세요.";
                }
            }
            else{
                _errorMessage = '';
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current = true;
            }
        
    }, [email, password, passwordConfirm, userId, emailValidated, isMan, isWoman,photoUrl,age]);

        useEffect(() => {
            setDisabled(            
                !(userId && email && password && passwordConfirm && !errorMessage &&emailValidated)
            );
            if(route.params.mode==="Store"){
                if(!photoUrl){
                    setDisabled(true);
                }
            }else {
                if(isMan===false && isWoman==false){
                    setDisabled(true);
                }
            }
        }, [userId, email, password, passwordConfirm, errorMessage, emailValidated, isMan, isWoman,photoUrl,age]);

        const _handleValidateEmailButtonPress = () => {
            setEmailValidated(true);
        };
        //서버 연동 후 이메일 인증 


        const _handleLastInput = () => {
            if(route.params.mode==="User"){
                ageRef.current.focus();
            }
        };

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
                hasButton
                buttonTitle="인증"
                onPress={_handleValidateEmailButtonPress}
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
                onSubmitEditing={_handleLastInput}
                placeholder="닉네임을 입력하세요"
                returnKeyType= {route.params.mode === "User"? "next" : "done"}
            />

        
            { route.params.mode === 'User' && (
                <>
                <Input
                    ref={ageRef}
                    label="나이"
                    value={age}
                    onChangeText={text => setAge(removeWhitespace(text))}
                    placeholder="나이를 입력하세요"
                    returnKeyType="done"
                />
                <CheckBoxContainer>
                    <Button 
                    title="남자"
                    containerStyle={{ flex: 1}}
                    onPress={()=>{
                        setIsMan(!isMan);
                        setIsWoman(false);
                    }}
                    isFilled={isMan? true : false}
                    />
                    <Button 
                    title="여자"
                    containerStyle={{flex: 1}}
                    onPress={()=>{
                        setIsWoman(!isWoman);
                        setIsMan(false);
                    }}
                    isFilled={isWoman? true : false}
                    />
                </CheckBoxContainer>
                </>
            )}
            
    
            { route.params.mode === 'Store' && (
                <>
                <ImageContainer>
                    <Image url={photoUrl} onChangeImage={url=> setPhotoUrl(url)} showButton />
                </ImageContainer>
                </>
            
            )}
            <ErrorText>{errorMessage}</ErrorText>
            <Button
                title="회원가입"
                onPress={() => {
                    navigation.navigate("Login"); 
                    // 서버 연동 이후 스피너 적용
                }}
                disabled={disabled}
            />

        </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;