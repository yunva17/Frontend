import React, {useState} from 'react';
import styled from "styled-components/native";
import { StyleSheet,Text, View} from "react-native";
import {ProfileImage, InfoText,ToggleButton} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
`;

const InfoChangeButton = styled.TouchableOpacity`
    justify-content: flex-end;  
    flexDirection: row;
    margin: 15px;
`;

const InfoChangeText = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: ${({theme})=> theme.titleColor};
`;

const InfoContainer = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
    margin-left: 40px;
`;

const SettingContainer = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
    margin-left: 20px;
    margin-top: 10px;
`;

const RowContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 5px;
`;

const CenterContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 15px;
`;

const  StoreInfo = ({navigation}) => {

    // 임의로 설정
    const [gender, setGender] = useState('female');
    const [isPromoted, setIsPromoted] = useState(false);
    const [isNoticed, setIsNoticed] = useState(false);


    return (
        <Container>
            <KeyboardAwareScrollView
                extraScrollHeight={20}>

            <InfoChangeButton 
                    onPress={() =>{navigation.navigate("StoreInfoChange");
                }}>
                    <InfoChangeText>내 정보 수정하기</InfoChangeText>
                </InfoChangeButton>

                <ProfileImage />

                <CenterContainer>
                    <RowContainer>
                        <MaterialIcons name="location-on" size={24}/>
                        <Text styl={styles.info}>장소위치</Text>
                    </RowContainer>
                    <RowContainer>
                        <MaterialIcons name="call" size={24}/>
                        <Text styl={styles.info}>전화번호</Text>
                    </RowContainer>
                </CenterContainer>

                <InfoContainer>
                    <InfoText label="닉네임" content="닉네임이름"/>
                    <InfoText label="이메일" content="이메일주소"/>
                    <InfoText label="비밀번호" content="비밀번호 비공개"/>
                    <InfoText label="서류" content="등록됨"/>
                </InfoContainer>
                
                <View style={styles.hr}/>

                <SettingContainer>
                    <RowContainer>
                        <MaterialIcons name="settings" size={35}/>
                        <Text 
                            style={{ 
                                fontSize: 23, 
                                marginLeft: 6, 
                                marginTop: 2}}>
                        환경설정</Text>
                    </RowContainer>
                    <SettingContainer>
                        <ToggleButton
                            label="알림 수신동의"
                            value={isNoticed}
                            onValueChange={() => setIsNoticed(previousState => !previousState)}/>
                    </SettingContainer>
                </SettingContainer>
                
                {/* 회원탈퇴 구현 필요 */}
                <InfoChangeButton 
                    onPress={() =>{}}
                    >
                    <Text style={styles.delete}>회원탈퇴</Text>
                </InfoChangeButton>


                </KeyboardAwareScrollView>
            </Container>
        
    );
};

const styles = StyleSheet.create({
    delete: {
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    info: {
        fontSize: 14, 
        marginLeft: 6, 
        marginTop: 2,
    },
    hr: {
        marginBottom: 10,
        marginTop: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    }
});

export default StoreInfo; 