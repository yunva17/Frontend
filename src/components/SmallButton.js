import React from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.TouchableOpacity`
    background-color: ${({theme,isFilled})=> isFilled? theme.buttonBackground : theme.buttonUnfilledBackground};
    align-items: center;
    border-radius: 4px;
    width: 20%;
    height: 35px;
    padding: 10px;
    opacity: ${({disabled}) => (disabled? 0.5 : 1)};
    margin-top: 5px;
`;

const Title = styled.Text`
    height: 30px;
    font-size: 14px;
    font-weight: bold;
    color: ${({theme, isFilled}) => isFilled? theme.buttonTextColor : theme.buttonUnfilledTitle };
`;

const SmallButton = ({containerStyle, title, onPress, isFilled, disabled}) => {
    return (
        <Container 
        style={containerStyle} 
        onPress={onPress} 
        isFilled={isFilled} 
        disabled={disabled}>
            <Title isFilled={isFilled}>{title}</Title>            
        </Container>
    );
};

SmallButton.defaultProps ={
    isFilled: true,
};

SmallButton.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isFilled: PropTypes.bool,
    disabled: PropTypes.bool,
};


export default SmallButton;