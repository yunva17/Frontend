import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components/native";
import {View, StyleSheet} from "react-native";
import {ProfileImage, InfoText, Button, RadioButton} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeWhitespace, validatePassword } from '../utils/common';


const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
`;

const InfoContainer = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
    margin-left: 40px;
`;

const CenterContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    margin-bottom: 5%;
`;
const RowContainer = styled.View`
    flex: 1;
    flex-direction: row;
    margin-bottom: 5px;
    margin-top: 6px;
`;

const RadioTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-right: 7px;
    width: 20%;
    align-self: center;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-top: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;


const  UserInfoChange = () => {

    // 임의로 설정, 연동 후 기존 설정값 등록
    const [Photo, setPhoto] = useState(null);
    const [phoneNumber,setPhoneNumber] = useState('');
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('female');
    const [errorMessage, setErrorMessage] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const didMountRef = useRef();
  
    //에러 메세지 설정 
    useEffect(() => {
        if(didMountRef.current) {
        let _errorMessage="";
        if(uploaded){
            _errorMessage="정보를 입력해주세요";
            if(!userName){
                _errorMessage = "닉네임을 입력하세요.";
            }else if(!password){
                _errorMessage = "비밀번호를 입력하세요.";
            }else if(!validatePassword(password)){
                _errorMessage = "비밀번호 조건을 확인하세요.";
            }else if(!phoneNumber){
                _errorMessage = "전화번호를 입력하세요.";
            }else if(!age){
                _errorMessage = "나이를 입력하세요.";
            }
            else {
                _errorMessage = "";
            }
        }
        setErrorMessage(_errorMessage);
        }else {
        didMountRef.current = true;
        }
    },[userName, password, phoneNumber, uploaded]);

    const _handleChangeButtonPress = () => {
        setUploaded(true);
     };
    return (
        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}>

                <View style={{marginTop: 30}} ></View>

               <ProfileImage 
                url={Photo}
                onChangeImage={url => setPhoto(url)}
                showButton />
                <InfoContainer>
                    <InfoText
                        label="닉네임"
                        value={userName}
                        onChangeText={ text => setuserName(text)}
                        placeholder="닉네임"
                        returnKeyType= "done"
                        isChanged
                        />
                    <InfoText label="이메일" content="이메일주소"/>
                    <InfoText
                        label="비밀번호"
                        value={password}
                        onChangeText={ text => setPassword(removeWhitespace(text))}
                        placeholder="특문, 숫자, 영문 포함 8자-16자"
                        returnKeyType= "done"
                        isChanged
                        isPassword
                    />
                    <InfoText
                        label="전화번호"
                        value={phoneNumber}
                        onChangeText={ text => setPhoneNumber(removeWhitespace(text))}
                        placeholder="전화번호"
                        returnKeyType= "done"
                        isChanged
                        keyboardType="number-pad"
                        />
                    <InfoText
                        label="나이"
                        value={age}
                        onChangeText={ text => setAge(text)}
                        placeholder="나이"
                        returnKeyType= "done"
                        isChanged
                        keyboardType="number-pad"
                        />
                        <RowContainer>
                            
                            <RadioTitle>성별</RadioTitle>
                            <RadioButton 
                                label="여자"
                                status={(gender==="female"? "checked" : "unchecked")}
                                containerStyle={{marginBottom:0, marginLeft: 0, marginRight: 0}}
                                onPress={() => setGender('female')}
                            />
                            <RadioButton 
                                label="남자"
                                status={(gender==="male"? "checked" : "unchecked")}
                                containerStyle={{marginBottom:0, marginLeft: 0, marginRight: 0}}
                                onPress={() => setGender('male')}
                            />
                    </RowContainer>
                    <ErrorText>{errorMessage}</ErrorText>
                </InfoContainer>
                
                <CenterContainer>
                    {/* 변경사항 서버 저장 */}
                    <Button 
                    containerStyle={{width:'50%', }}
                    title="저장"
                    onPress={ _handleChangeButtonPress }
                    />
                </CenterContainer>

                </KeyboardAwareScrollView>
            </Container>
        
    );
};

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: '40%',
        backgroundColor: 'white',
      },
      background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
});

export default UserInfoChange; 