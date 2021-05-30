import React from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { RadioButton } from 'react-native-paper';

const Container = styled.View`
  flex-direction: row;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme}) => theme.label};
`;


const Button = ({ label, value, status, onPress, containerStyle }) => {
  return (
    <Container style={containerStyle}>
      <Label>{label}</Label>
      <RadioButton
        value={value}
        status={status}
        onPress={onPress}
     />
    </Container>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  value: PropTypes.bool,
  status: PropTypes.string,
  containerStyle: PropTypes.object,
};

export default Button;

