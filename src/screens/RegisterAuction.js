import React, {useLayoutEffect, useState, useEffect, useRef} from 'react';
import styled from "styled-components/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {DateTimePicker,  RadioButton} from "../components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {removeWhitespace} from "../utils/common";

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({theme})=> theme.background};
    padding: 10px 20px;
`;

  const StyledTextInput  = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
  }))`
      width: 100%;
      background-color: ${({ theme}) => theme.background};
      color: ${({ theme }) => theme.text};
      padding: 20px 10px;
      font-size: 16px;
      border: 1px solid ${({ theme}) => theme.inputBorder};
      border-radius: 4px;
      margin-bottom: 10px;
  `;

  const DateContainer = styled.TouchableOpacity`
    background-color: ${({theme})=> theme.background}
    align-items: flex-start;
    border-radius: 4px;
    width: 100%;
    padding: 20px 10px;
    border: 1px solid ${({ theme}) => theme.inputBorder};
    margin-bottom: 10px;
  `;


  const ButtonTitle = styled.Text`
    font-size: 16px;
    color: ${({theme})=> theme.inputPlaceholder}
  `;

  const Label = styled.Text`
      font-size: 16px;
      color: ${({theme})=> theme.text}
      align-self: flex-start;
      margin-bottom:5px;
  `;

  const TripleLabel = styled.Text`
font-size: 16px;
color: ${({theme})=> theme.text}
align-self: flex-start;
width: 35%
`;


const RadioContiner = styled.View`
margin-left: 2px;
width: 100%;
flex-direction: row;
`;

const InputContiner = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
`;

const StyledTextInputs  = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
  }))`
    width: 30%;
    background-color: ${({ theme}) => theme.background};
    color: ${({ theme }) => theme.text};
    padding: 10px 10px;
    font-size: 16px;
    border: 1px solid ${({ theme}) => theme.inputBorder};
    border-radius: 4px;
    margin-bottom: 10px;
    margin-top: 5px;
  `;

  const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const RegisterAuction = ({navigation}) => {
    const [title, setTitle] = useState("");
    const [bookDateVisible, setBookDateVisible] = useState(false);
    const [bookDate, setBookDate] = useState("");
    const [bookTime, setBookTime] = useState("");
    const [bookTimeVisible, setBookTimeVisible] = useState(false);
    const [endDateVisible, setEndDateVisible] = useState(false);
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [endTimeVisible, setEndTimeVisible] = useState(false);
    const [meetingType, setMeetingType] = useState("");
    const [foodType, setFoodType] = useState("");
    const [numOfPeople, setNumOfPeople] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [uploaded, setUploaded] = useState(false);
    const didMountRef = useRef();

    useEffect(() => {
      if(didMountRef.current) {
        let _errorMessage="";
        if(!title){
          _errorMessage = "공고 제목을 입력하세요";
        }else if(!bookDate){
          _errorMessage = "예약 날짜를 입력하세요";
        }else if(!bookTime){
          _errorMessage = "예약 시간을 입력하세요";
        }else if(!meetingType){
          _errorMessage = "단체 유형을 입력하세요";
        }else if(!foodType){
          _errorMessage = "선호 메뉴을 입력하세요";
        }else if(!numOfPeople){
          _errorMessage = "인원 수를 입력하세요";
        }else if(!city){
          _errorMessage = "선호 지역을 입력하세요";
        }else if(!price){
          _errorMessage = "선호 가격대을 입력하세요";
        }else if(!endDate){
          _errorMessage = "공고 마감 날짜를 입력하세요";
        }else if(!endTime){
          _errorMessage = "공고 마감 시간을 입력하세요";
        }else {
          _errorMessage = "";
        }
        setErrorMessage(_errorMessage);

      }else {
        didMountRef.current = true;
      }
    },[title, bookDate,bookTime,endDate,endTime,meetingType,foodType,numOfPeople,city,price]);

    useEffect(()=> {
      setDisabled(!(title && bookDate && bookTime && endDate && endTime && meetingType && foodType && numOfPeople && city && price && !errorMessage));
    },[title, bookDate,bookTime,endDate,endTime,meetingType,foodType,numOfPeople,city,price,errorMessage]);

    //공고 등록 후 공고 상세 보여주기 함수 연동 후 스피너 추가
    const _onPress = () => {
      setUploaded(true);
      if(!disabled){
        navigation.navigate("Main")
      }
      };

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
              disabled? (<MaterialCommunityIcons name="check" size={35} onPress={_onPress} 
              style={{marginRight: 10, marginBottom:3, opacity: 0.5}}/>)
              : (<MaterialCommunityIcons name="check" size={35} onPress={_onPress} 
              style={{marginRight: 10, marginBottom:3, opacity: 1}}/>)
            )});
        },[]);

        const _handleBookDatePress =() => {
            setBookDateVisible(true);
        };

        const _setBookDate = date => {
          setBookDate(date);
          setBookDateVisible(false);
        };

        const _hideBookDatePicker = () => {
          setBookDateVisible(false);
        };

        const _handleBookTimePress =() => {
          setBookTimeVisible(true);
      };

      const _setBookTime = time => {
        setBookTime(time);
        setBookTimeVisible(false);
      };

      const _hideBookTimePicker = () => {
        setBookTimeVisible(false);
      };

      const _handleEndDatePress =() => {
        setEndDateVisible(true);
    };

    const _setEndDate = date => {
      setEndDate(date);
      setEndDateVisible(false);
    };

    const _hideEndDatePicker = () => {
      setEndDateVisible(false);
    };

    const _handleEndTimePress =() => {
      setEndTimeVisible(true);
  };

  const _setEndTime = time => {
    setEndTime(time);
    setEndTimeVisible(false);
  };

  const _hideEndTimePicker = () => {
    setEndTimeVisible(false);
  };



    return (
      <KeyboardAwareScrollView
        extraScrollHeight={20}
        >
        <Container>
          {uploaded && disabled && <ErrorText>{errorMessage}</ErrorText>}
          <Label>공고 제목</Label>
           <StyledTextInput 
           value={title}
           onChangeText={text => setTitle(text)}
           placeholder="공고 제목을 입력하세요."
           returnKeyType="done"
           maxLength={20}
           autoCapitalize="none"
          autoCorrect={false}
          textContentType="none" // iOS only
          underlineColorAndroid="transparent" // Android only
           />
           <Label>예약 날짜 및 시간</Label>
           <DateContainer onPress={_handleBookDatePress} >
             <ButtonTitle>{bookDate? String(bookDate) :"예약할 날짜를 입력하세요."}</ButtonTitle>
           </DateContainer>
            <DateTimePicker visible={bookDateVisible} mode="date" handleConfirm={_setBookDate} handleCancel={_hideBookDatePicker}/>
        
            <DateContainer onPress={_handleBookTimePress} >
             <ButtonTitle>{bookTime? String(bookTime) :"예약할 시간을 입력하세요."}</ButtonTitle>
           </DateContainer>
            <DateTimePicker visible={bookTimeVisible} mode="time" handleConfirm={_setBookTime} handleCancel={_hideBookTimePicker}/>

           
            <TripleLabel>단체 유형</TripleLabel>
            <RadioContiner>
            <RadioButton 
            label="회식"
            value={(meetingType==="회식")}
            status={(meetingType==="회식"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(meetingType==="회식"){
                    setMeetingType("");
                }else {
                    setMeetingType("회식");
                }
            }}
            />
            <RadioButton 
            label="친구 모임"
            value={(meetingType==="친구 모임")}
            status={(meetingType==="친구 모임"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(meetingType==="친구 모임"){
                    setMeetingType("");
                }else {
                    setMeetingType("친구 모임");
                }
            }}
            />
            <RadioButton 
            label="가족 모임"
            value={(meetingType==="가족 모임")}
            status={(meetingType==="가족 모임"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(meetingType==="가족 모임"){
                    setMeetingType("");
                }else {
                    setMeetingType("가족 모임");
                }
            }}
            />
            <RadioButton 
            label="기타"
            value={(meetingType==="기타")}
            status={(meetingType==="기타"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(meetingType==="기타"){
                    setMeetingType("");
                }else {
                    setMeetingType("기타");
                }
            }}
            />
            </RadioContiner>

            <TripleLabel>선호 메뉴</TripleLabel>
            <RadioContiner>
            <RadioButton 
            label="한식"
            value={(foodType==="한식")}
            status={(foodType==="한식"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(foodType==="한식"){
                    setFoodType("");
                }else {
                    setFoodType("한식");
                }
            }}
            />
            <RadioButton 
            label="양식"
            value={(foodType==="양식")}
            status={(foodType==="양식"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(foodType==="양식"){
                    setFoodType("");
                }else {
                    setFoodType("양식");
                }
            }}
            />
           <RadioButton 
            label="중식"
            value={(foodType==="중식")}
            status={(foodType==="중식"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(foodType==="중식"){
                    setFoodType("");
                }else {
                    setFoodType("중식");
                }
            }}
            />
            <RadioButton 
            label="일식"
            value={(foodType==="일식")}
            status={(foodType==="일식"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(foodType==="일식"){
                    setFoodType("");
                }else {
                    setFoodType("일식");
                }
            }}
            />
            <RadioButton 
            label="기타"
            value={(foodType==="기타")}
            status={(foodType==="기타"? "checked" : "unchecked")}
            containerStyle={{ marginLeft: 0, marginRight: 0}}
            onPress={() => {
                if(foodType==="기타"){
                    setFoodType("");
                }else {
                    setFoodType("기타");
                }
            }}
            />
            </RadioContiner>
           <RadioContiner>
           <TripleLabel>인원수</TripleLabel>
            <TripleLabel>선호지역</TripleLabel>
            <TripleLabel>선호가격대</TripleLabel>
           </RadioContiner>
            <InputContiner>
            <StyledTextInputs 
           value={numOfPeople}
           onChangeText={text => setNumOfPeople(removeWhitespace(text))}
           autoCapitalize="none"
           keyboardType="number-pad"
           autoCorrect={false}
           placeholder="인원수"
           textContentType="none" // iOS only
           underlineColorAndroid="transparent" // Android only
           />

           <StyledTextInputs 
           value={city}
           onChangeText={text => setCity(removeWhitespace(text))}
           autoCapitalize="none"
           placeholder="선호지역"
           autoCorrect={false}
           textContentType="none" // iOS only
           underlineColorAndroid="transparent" // Android only
           />

           <StyledTextInputs
           value={price}
           onChangeText={text => setPrice(removeWhitespace(text))}
           autoCapitalize="none"
           keyboardType="number-pad"
           placeholder="선호가격대"
           autoCorrect={false}
           textContentType="none" // iOS only
           underlineColorAndroid="transparent" // Android only
           />

        </InputContiner>


            <Label>공고 마감 날짜 및 시간</Label>
            <DateContainer onPress={_handleEndDatePress} >
             <ButtonTitle>{endDate? String(endDate) :"공고를 마감할 날짜를 입력하세요."}</ButtonTitle>
           </DateContainer>
            <DateTimePicker visible={endDateVisible} mode="date" handleConfirm={_setEndDate} handleCancel={_hideEndDatePicker}/>

            <DateContainer onPress={_handleEndTimePress} >
             <ButtonTitle>{endTime? String(endTime) :"공고를 마감할 시간을 입력하세요."}</ButtonTitle>
           </DateContainer>
            <DateTimePicker visible={endTimeVisible} mode="time" handleConfirm={_setEndTime} handleCancel={_hideEndTimePicker}/>

        </Container>
        </KeyboardAwareScrollView>
    );
};


export default RegisterAuction;