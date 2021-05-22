import React from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {images} from "../images";

const Container = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${({theme})=> theme.background};
    align-items: center;
    width: auto;
    padding: 0 5px; 
`;

const Title = styled.Text`
    height: 30px;
    line-height: 30px;
    font-size: 16px
    font-weight: bold;
    color: ${({theme})=> theme.text};
`;

const Icon = styled.Image`
    tint-color: ${({theme})=> theme.text};
    width: 25px;
    height: 25px;
`;

const LoginLetter = ({hasIcon, type, title, onPress}) => {
    return (
        <Container onPress={onPress}>
            <Title>{title}</Title>
            {hasIcon && <Icon source={type} />} 
        </Container>
    );
};

LoginLetter.defaultProps ={
    hasIcon: false,
};

LoginLetter.propTypes = {
    hasIcon: PropTypes.bool,
    type: PropTypes.oneOf(Object.values(images)),
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
};

export default LoginLetter;