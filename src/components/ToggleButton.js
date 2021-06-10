import React from "react";
import { Switch } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 7px 0;
`;
const Label = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-right: 7px;
  margin-top: 3px;
  width: 40%;
`;
 
const ToggleButton = ({label, value, onValueChange}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Switch
        trackColor={{  false: "#767577", true: "#81b0ff"  }}
        thumbColor={{value} ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </Container>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};


export default ToggleButton;