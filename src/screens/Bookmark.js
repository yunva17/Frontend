import React, {useState} from 'react';
import {bookmarks} from "../utils/data";
import styled from "styled-components/native";
import {FlatList} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";

const AlertContainer = styled.TouchableOpacity`
    flex-direction: row;
    padding: 15px;
    border-bottom-width: 0.5px;
    border-top-width: 0.5px;
    border-color: ${({theme}) => theme.label};
    background-color: ${({ theme }) => theme.background};
`;

const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-right: 15px;
`;

const TextContainer = styled.View`
    flex: 1;
`;

const TitleContainer = styled.View`
    width: 95%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3%;
`;

const StyledImage = styled.Image`
    background-color: ${({theme}) => theme.imageBackground};
    height: 85;
    width: 85;
    border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const NameTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme})=> theme.text};
`;

const TimeText = styled.Text`
    font-size: 13px;
    color: ${({theme})=> theme.text};
`;

const DescText = styled.Text`
    font-size: 15px;
    font-weight: normal;
    color: ${({theme})=> theme.text};
`;

const Alert = ({item: {id, src, name, menu, type, location}, onPress, onStarPress}) => {
    return (
        <AlertContainer onPress={onPress}>
            <ImageContainer>
                <StyledImage source={{ uri: src }} rounded={false} />
            </ImageContainer>
            <TextContainer>
                <TitleContainer>
                    <NameTitle>{name}</NameTitle>
                    <MaterialCommunityIcons name="star" size={40} onPress={onStarPress} color="yellow"
                    style={{marginLeft: 15, marginTop: 5, opacity: 0.7}}/>
                </TitleContainer>
                <DescText>{menu}</DescText>
                <DescText>{type}</DescText>
                <DescText>{location}</DescText>
            </TextContainer>
        </AlertContainer>
    );
};


const Bookmark = ({navigation}) => {
    const [data, setData] = useState(bookmarks);

    const _onRemove = id => {
        setData(data.filter(item => item.id !== id));
    };

    
    return (
        <FlatList 
            horizontal={false}
            keyExtractor={item => item['id'].toString()}
            data={data}
            renderItem={({item}) => (
                <Alert key={item['id'].toString()} item={item} 
                onStarPress={() => _onRemove(item['id'])}
                onPress = {() => {
                    navigation.navigate("AuctionDetail");
                }}
                />
                
        )}/>                
        
    );
};


export default Bookmark;