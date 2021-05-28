import React,{useState} from 'react';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { useEffect } from 'react';
import {Platform, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {} from "../components/Button";

const Container = styled.View` 
    height:80%;
    width: 100%;
    margin-top: 0;
`;

const StyledImage = styled.Image`
    background-color: ${({theme})=> theme.imageBackground};
    height: 100%;
    width: 100%;
   
`;

const ButtonContainner = styled.TouchableOpacity`
    background-color: ${({theme, uploaded})=> uploaded? theme.buttonCompleted : theme.buttonBackground};
    align-items: center;
    border-radius: 4px;
    width: 100%;
    padding: 10px;
`;

const ButtonTitle = styled.Text`
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    color: ${({theme})=> theme.buttonTextColor};
`;



    const Image = ({url, imageStyle, onChangeImage, showButton}) => {
    const [text, setText] = useState("증명 서류 사진 등록");
    const [uploaded, setUploaded] = useState(false);
    useEffect(()=> {
        (async () => {
            try {
                if(Platform.OS !== "web") {
                    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== "granted") {
                        Alert.alert(
                            "Photo Permission",
                            "Please turn on the camera roll permission."
                        );
                    }
                }
            }catch(e) {
                Alert.alert("Photo Permission Error", e.message);
            }
        })();
    },[]);

    const _handleEditButton = async () => {
        
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if(!result.cancelled) {
                onChangeImage(result.uri);
            }

            setText("증명 서류 등록 완료");
            setUploaded(true);
        }catch (e) {
            Alert.alert("Photo Error", e.message);
        }
    };

    return (
        <Container uploaded={uploaded}>
            <StyledImage source={{uri: url}} style={imageStyle} />
            { showButton && 
            <ButtonContainner onPress={_handleEditButton} uploaded={uploaded}>
                <ButtonTitle>{text}</ButtonTitle>
            </ButtonContainner> }
        </Container>
    );
};

Image.defaultProps = {
    onChangeImage: ()=>{},
    showButton: false,
}

Image.propTypes = {
    uri: PropTypes.string,
    imageStyle: PropTypes.object,
    onChangeImage: PropTypes.func,
    showButton: PropTypes.bool,
}

export default Image;