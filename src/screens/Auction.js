import React from 'react';
import styled from "styled-components/native";
import {Text, Button} from "react-native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=> theme.background};
`;

const Auction = ({navigation}) => {
    return (
        <Container>
            <Text style={{fontSize: 30}}>Auction Screen</Text>
            <Button title="경매 상세" onPress={() => {
                 navigation.navigate("AuctionDetail");
            }} />
        </Container>
    );
};

export default Auction; 