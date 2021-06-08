import React from 'react';
import styled from "styled-components/native";
import MypageButton from '../components/MypageButton';
import ProfileImage from '../components/ProfileImage';
import SmallButton from '../components/SmallButton';

const Header = styled.View`
    height: 8%;
`;

const Title = styled.Text`
    font-size: 32px;
    margin: 20px;
`;

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
            {/*
            <Header>
                <Title>마이페이지</Title>
            </Header>
            */}
            
            <InfoContainer>
                <ProfileButton onPress={() => {
                    navigation.navigate("UserInfo");
                }}>
                    <ProfileImage />
                    <Username>사용자 이름</Username>
                </ProfileButton>
                <SmallButton title="로그아웃" onPress={ () => {}} />
            </InfoContainer>
            
            <IconContainer>
                <MypageButton title='이용내역' name='list-alt' />
                <MypageButton title='리뷰관리' name='thumb-up' />
                <MypageButton title='공고관리' name='description' />
            </IconContainer>
            <IconContainer>
                <MypageButton title='결제관리' name='payment' /> 
                <MypageButton title='채팅관리' name='chat' />
                <MypageButton title='즐겨찾기' name='star' />
            </IconContainer>
        </Container>
    );
};

export default Mypage; 