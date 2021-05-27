import React, { useEffect } from 'react';
import { Platform, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import SmallButton from "./SmallButton";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme}) => theme.label};
`;

const StyledImage = styled.Image`
  margin-top: 10px;
  width: 100px;
  height: 100px;
`;

const Image = ({url, label, onChangeImage}) => {

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('사진 권한 허가가 필요합니다');
            }
          }
        })();
    }, []);

    const _handleEditButton = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3,4],
                quality: 1,
              });

              if(!result.cancelled) { 
                onChangeImage(result.uri);
              }
        } catch(e) {
            Alert.alert('사진 오류', e.message);
        }
      };
    return(
        <Container>
            <Label>{label}</Label>
            <SmallButton title="첨부파일" onPress={_handleEditButton} />
            {url && <StyledImage source={{ uri: url }} />}
        </Container>
         
    );
};
Image.defaultProps = {
  onChangeImage: () => {},
}

Image.propTypes = {
  label: PropTypes.string.isRequired,
  onChangeImage: PropTypes.func,
  uri: PropTypes.string,
}

export default Image;