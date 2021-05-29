import React from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {images} from "../images";

const Container = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Icon = styled.Image`
    tint-color: ${({theme})=> theme.icon};
    width: 40%;
`;


const IconButton = ({type, onPress}) => {
    return (
        <Container onPress={onPress}>
            <Icon source={type} />
        </Container>
    );
};


IconButton.propTypes = {
    type: PropTypes.oneOf(Object.values(images)),
    onPress: PropTypes.func.isRequired,
};

export default IconButton;