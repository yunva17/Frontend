import React from 'react';
import styled from "styled-components/native";
import {MypageButton, ProfileImage, SmallButton} from '../components';

const Container = styled.View`
    background-color: ${({theme})=> theme.background};
    flex: 1;
`;

const IconContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 20px;
`;

const InfoContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
    margin: 30px;
    margin-left: 40px;
`;

const ProfileButton = styled.TouchableOpacity`
    flex-direction: row;
    width: 75%;
`
const Username = styled.Text`
    font-size: 25px;
    margin: 20px;
`;

const Mypage = ( {navigation} ) => {
    return (
        <Container>
            <InfoContainer>
                <ProfileButton onPress={() => {
                    navigation.navigate("UserInfo");
                }}>
                    <ProfileImage />
                    <Username>업체 이름</Username>
                </ProfileButton>
                <SmallButton title="로그아웃" onPress={ () => {}} />
            </InfoContainer>
            
            <IconContainer>
                <MypageButton title='입찰내역' name='description' />
                <MypageButton title='업체관리' name='home-work' />
                <MypageButton title='리뷰관리' name='thumb-up' />
            </IconContainer>
            <IconContainer>
                <MypageButton title='로그분석' name='insert-chart' /> 
                <MypageButton title='채팅관리' name='chat' />
                <MypageButton title='즐겨찾기' name='star' />
            </IconContainer>
        </Container>
    );
};

export default Mypage; 