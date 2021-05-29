import React from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { RadioButton } from 'react-native-paper';

const Container = styled.View`
  flex-direction: row;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 15px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-top:8px;
  color: ${({theme}) => theme.label};
`;


const Button = ({ label, value, status, onPress }) => {
  return (
    <Container>
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
};

export default Button;

