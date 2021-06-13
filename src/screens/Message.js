import React from 'react';
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`;

const Title = styled.Text`
    height: 30px;
    line-height: 30px;
    font-size: 16px
    font-weight: bold;
    color: ${({theme})=> theme.text};
`;

const Message = () => {
    return (
        <Container>
            <Title>Message</Title>
        </Container>
    );
};

export default Message;