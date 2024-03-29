import React, {useLayoutEffect, useState, useEffect, useRef} from 'react';
import styled from "styled-components/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {DateTimePicker,  RadioButton} from "../components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {removeWhitespace} from "../utils/common";
import DropDownPicker from "react-native-dropdown-picker";
import {Dimensions, Alert} from "react-native";
import { theme } from '../theme';

const WIDTH = Dimensions.get("screen").width;

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

  const InfoLabel = styled.Text`
      font-size: 20px;
      color: ${({theme})=> theme.text}
      font-weight: bold;
      align-self: flex-start;
      margin-bottom:10px;
  `;

  const TripleLabel = styled.Text`
  font-size: 16px;
  color: ${({theme})=> theme.text}
  align-self: flex-start;
  width: 30%;
  margin-left: 1%;
`;

const DoubleLabel = styled.Text`
font-size: 16px;
color: ${({theme})=> theme.text}
align-self: flex-start;
width: 51%;
margin-bottom: 2px;
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

const RegionContiner = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const SmallContainer = styled.View`
  height: 50%;
  align-self: center;
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

const AddContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const AdditionContainer = styled.View`
  background-color:  ${({ theme }) => theme.label};
  height: 1px;
`;



const RegisterAuction = ({navigation}) => {
  //각 변수들에 대한 state 
    const [title, setTitle] = useState("");
    const [book, setBook] = useState(''); //String ver.
    const [end, setEnd] = useState("");
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
    const [maxPrice, setMaxPrice] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [errorMessage, setErrorMessage] = useState("아래 정보를 입력해주세요.");
    const [disabled, setDisabled] = useState(true);
    const [uploaded, setUploaded] = useState(false);
    const [content, setContent] = useState('');
    const [nowTime, setNowTime] = useState("");
    const didMountRef = useRef();

    // 지역 드롭다운  
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(""); // 선택된 지역(시,도)
    const [city, setCity] = useState(""); // 상세 지역
    const [cities, setCities] = useState([
      {label: "서울특별시", value: "서울특별시"},
      {label: "부산광역시", value: "부산광역시"},
      {label: "대구광역시", value: "대구광역시"},
      {label: "인천광역시", value: "인천광역시"},
      {label: "광주광역시", value: "광주광역시"},
      {label: "대전광역시", value: "대전광역시"},
      {label: "울산광역시", value: "울산광역시"},
      {label: "세종특별자치시", value: "세종특별자치시"},
      {label: "강원도", value: "강원도"},
      {label: "경기도", value: "경기도"},
      {label: "충청북도", value: "충청북도"},
      {label: "충청남도", value: "충청남도"},
      {label: "전라북도", value: "전라북도"},
      {label: "전라남도", value: "전라남도"},
      {label: "경상북도", value: "경상북도"},
      {label: "경상남도", value: "경상남도"},
      {label: "제주특별자치도", value: "제주특별자치도"},
    ]);

    // 나이 드롭다운  
    const [open1, setOpen1] = useState(false);
    const [selectedAge, setSelectedAge] = useState("");
    const [ages, setAges] = useState([
      {label: "~19", value: "~19"},
      {label: "20~25", value: "20~25"},
      {label: "26~30", value: "26~30"},
      {label: "31~35", value: "31~35"},
      {label: "36~40", value: "36~40"},
      {label: "41~50", value: "41~50"},
      {label: "51~60", value: "51~60"},
      {label: "60~", value: "60~"},
    ]);

    // 성별 드롭다운 
    const [open2, setOpen2] = useState(false);
    const [selectedSex, setSelectedSex] = useState("");
    const [sexes, setSexes] = useState([
      {label: "남자", value: "남자"},
      {label: "여자", value: "여자"},
      {label: "반반", value: "반반"},
    ]); 

    //에러 메세지 설정 
    useEffect(() => {
      if(didMountRef.current) {
        let _errorMessage="";
        if(!title){
          _errorMessage = "공고 제목을 입력하세요";
        }else if(!bookDate){
          _errorMessage = "예약 날짜를 입력하세요";
        }else if(!bookTime){
          _errorMessage = "예약 시각을 입력하세요";
        }else if(parseInt(book)<parseInt(getNowString())) {
          _errorMessage = "예약 시간을 잘못 입력하였습니다";
        }
        else if(!meetingType){
          _errorMessage = "단체 유형을 입력하세요";
        }else if(!foodType){
          _errorMessage = "선호 메뉴을 입력하세요";
        }else if(!numOfPeople){
          _errorMessage = "인원 수를 입력하세요";
        }else if(numOfPeople.includes(","))
        {
          _errorMessage = "인원 수를 제대로 입력하세요";
        }else if(numOfPeople.includes("."))
        {
          _errorMessage = "인원 수를 제대로 입력하세요";
        }else if (parseInt(numOfPeople)< 1) {
          _errorMessage = "인원 수를 제대로 입력하세요";
        } else if(!minPrice){
          _errorMessage = "선호가격대의 최소 가격을 입력하세요";
        }else if(minPrice.includes(","))
        {
          _errorMessage = "최소 가격을 제대로 입력하세요";
        }else if(minPrice.includes("."))
        {
          _errorMessage = "최소 가격을 제대로 입력하세요";
        }else if(parseInt(minPrice) <0){
          _errorMessage = "최소 가격을 제대로 입력하세요";
        }else if(!maxPrice){
          _errorMessage = "선호가격대의 최대 가격을 입력하세요";
        }else if(maxPrice.includes(","))
        {
          _errorMessage = "최대 가격을 제대로 입력하세요";
        }else if(maxPrice.includes("."))
        {
          _errorMessage = "최대 가격을 제대로 입력하세요";
        }else if (parseInt(maxPrice) <0) {
          _errorMessage = "최대 가격을 제대로 입력하세요";
        }else if(parseInt(minPrice) > parseInt(maxPrice)) {
          _errorMessage = "최소 가격과 최대 가격을 제대로 입력하세요";
        }
        else if(!selected){
          _errorMessage = "선호지역을 입력하세요";
        }
        else if(!endDate){
          _errorMessage = "공고 마감 날짜를 입력하세요";
        }
        else if(!endTime){
          _errorMessage = "공고 마감 시각을 입력하세요";
        }else if(parseInt(end)<parseInt(getNowString())) {
          _errorMessage = "공고 마감 시간을 잘못 입력하였습니다";
        }else if(parseInt(end)>parseInt(book)){
          _errorMessage = "공고 마감 시간을 예약 시간 이전으로 설정해주세요."
        }
        else {
          _errorMessage = "";
        }
        setErrorMessage(_errorMessage);

      }else {
        didMountRef.current = true;
      }
    },[title, bookDate,bookTime,endDate,endTime,meetingType,foodType,numOfPeople,minPrice, maxPrice,selected,book,end]);

    useEffect(()=> {
      setDisabled(!(title && bookDate && bookTime && endDate && endTime && meetingType && foodType && numOfPeople && selected  && maxPrice && minPrice && !errorMessage));
    },[title, bookDate,bookTime,endDate,endTime,meetingType,foodType,numOfPeople,minPrice,maxPrice,errorMessage,selected]);


    useEffect(()=> {
      var _book = bookDate.slice(0,4)+bookDate.slice(6,8)+bookDate.slice(10,12)+bookTime.slice(0,2)+bookTime.slice(4,6);
      var _end =  endDate.slice(0,4)+endDate.slice(6,8)+endDate.slice(10,12)+endTime.slice(0,2)+endTime.slice(4,6);
      setBook(_book);
      setEnd(_end);
    },[bookTime,bookDate,endDate,endTime]);

    //공고 등록 버튼 액션: 공고 등록 후 공고 상세 보여주기 함수 연동 후 스피너 추가
    const _onPress = () => {
      setUploaded(true);

      if(!disabled){
        // 서버에 post후
        setTitle('');
        setBookDate("");
        setBookTime("");
        setEndDate("");
        setEndTime("");
        setMeetingType("");
        setFoodType("");
        setNumOfPeople("");
        setSelected("");
        setSelectedAge("");
        setSelectedSex("");
        setContent("");
        setCity("");
        setMinPrice("");
        setMaxPrice("");
        setErrorMessage("아래 정보를 입력해주세요");
        setDisabled(true);
        setUploaded(false);
        //임의로 메인보내기 원래는 공고 상세로 이동. 
        navigation.navigate("Main");
      }
      };

      useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
              disabled? (<MaterialCommunityIcons name="check" size={35} onPress={_onPress} 
              style={{marginRight: 10, marginBottom:3, opacity: 0.3}}/>)
              : (<MaterialCommunityIcons name="check" size={35} onPress={_onPress} 
              style={{marginRight: 10, marginBottom:3, opacity: 1}}/>)
            )});
        },[disabled]);

        const getNowString =() => {
          var now = new Date();
          var nowYear = String(now.getFullYear()); 
          var nowMonth = now.getMonth()+1;
          if(nowMonth < 10){
            nowMonth = "0" + String(nowMonth);
          }else{
            nowMonth = String(nowMonth);
          }
          var nowDate = now.getDate();
          if(nowDate < 10){
            nowDate = "0" + String(nowDate);
          }else {
            nowDate = String(nowDate);
          }
          var nowHour = now.getHours();
          if(nowHour < 10){
            nowHour = "0" + String(nowHour);
          }else {
            nowHour = String(nowHour);
          }
          var nowMinute = now.getMinutes();
          if(nowMinute < 10){
            nowMinute = "0" + String(nowMinute);
          }else {
            nowMinute = String(nowMinute);
          }
          var nowString = nowYear+nowMonth+nowDate+nowHour+nowMinute;

          return nowString;
        };



      //date picker 각 시간 input에 대한 action 
        const _handleBookDatePress =() => {
            setBookDateVisible(true);
        };


        const days=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];

        const _setBookDate = date => {
          y = date.getFullYear();
          m = date.getMonth()+1;
          if(m < 10){
            m = "0"+m;
          }
          d = date.getDate();
          if(d< 10){
            d = "0"+d;
          }
          w = days[date.getDay()];
          setBookDate(y+"년 "+m+"월 "+d+"일 "+w);
          setBookDateVisible(false);
        };

        const _hideBookDatePicker = () => {
          setBookDateVisible(false);
        };

        const _handleBookTimePress =() => {
          setBookTimeVisible(true);
      };

      const _setBookTime = time => {
        h = time.getHours();
        m = time.getMinutes();
        if(h < 10){
          h = "0"+h;
        }
        
        if(m< 10){
          m = "0"+m;
        }
        setBookTime(h+"시 "+m+"분");
        setBookTimeVisible(false);
      };

      const _hideBookTimePicker = () => {
        setBookTimeVisible(false);
      };

      const _handleEndDatePress =() => {
        setEndDateVisible(true);
    };

    const _setEndDate = date => {
      y = date.getFullYear();
      m = date.getMonth()+1;
      if(m < 10){
        m = "0"+m;
      }
      d = date.getDate();
      if(d< 10){
        d = "0"+d;
      }
      w = days[date.getDay()];
      setEndDate(y+"년 "+m+"월 "+d+"일 "+w);
      setEndDateVisible(false);
    };

    const _hideEndDatePicker = () => {
      setEndDateVisible(false);
    };

    const _handleEndTimePress =() => {
      setEndTimeVisible(true);
  };

  const _setEndTime = time => {
    h = time.getHours();
    m = time.getMinutes();
    if(h < 10){
      h = "0"+h;
    }
    
    if(m< 10){
      m = "0"+m;
    }
    setEndTime(h+"시 "+m+"분");
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
           <Label>예약 날짜 및 시각</Label>
           <DateContainer onPress={_handleBookDatePress} >
             <ButtonTitle>{bookDate? bookDate :"예약할 날짜를 입력하세요."}</ButtonTitle>
           </DateContainer>
            <DateTimePicker visible={bookDateVisible} mode="date" handleConfirm={_setBookDate} handleCancel={_hideBookDatePicker}/>
        
            <DateContainer onPress={_handleBookTimePress} >
             <ButtonTitle>{bookTime? bookTime :"예약할 시간을 입력하세요."}</ButtonTitle>
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
                value={minPrice}
                onChangeText={text => setMinPrice(removeWhitespace(text))}
                autoCapitalize="none"
                keyboardType="number-pad"
                placeholder="최소가격"
                autoCorrect={false}
                textContentType="none" // iOS only
                underlineColorAndroid="transparent" // Android only
                />
                <SmallContainer>
                  <Label>~</Label>
                </SmallContainer>
                <StyledTextInputs
                value={maxPrice}
                onChangeText={text => setMaxPrice(removeWhitespace(text))}
                autoCapitalize="none"
                keyboardType="number-pad"
                placeholder="최대가격"
                autoCorrect={false}
                textContentType="none" // iOS only
                underlineColorAndroid="transparent" // Android only
                />

        </InputContiner>

        <RadioContiner style={{marginBottom: 5}}>
            <TripleLabel>선호 지역</TripleLabel>
        </RadioContiner>

 <RegionContiner>
        <DropDownPicker 
        open={open}
        value={selected}
        items={cities}
        setOpen={setOpen}
        setValue={setSelected}
        setItems={setCities}
        containerStyle={{width: WIDTH*0.43, alignSelf: 'center'}}
        placeholder="시/도"
        placeholderStyle={{color: theme.label, fontSize: 16}}
        listMode="SCROLLVIEW"
        />   

        <StyledTextInputs 
           value={city}
           onChangeText={text => setCity(removeWhitespace(text))}
           autoCapitalize="none"
           placeholder="시/군/구/읍/면/동"
           autoCorrect={false}
           textContentType="none" // iOS only
           underlineColorAndroid="transparent" // Android only
           style={{width: WIDTH * 0.43, marginBottom: 0, marginTop: 0, marginLeft: 10}}
           />

</RegionContiner>

            <Label>공고 마감 날짜 및 시각</Label>
            <DateContainer onPress={_handleEndDatePress} >
             <ButtonTitle>{endDate? endDate :"공고를 마감할 날짜를 입력하세요."}</ButtonTitle>
           </DateContainer>
            <DateTimePicker visible={endDateVisible} mode="date" handleConfirm={_setEndDate} handleCancel={_hideEndDatePicker}/>

            <DateContainer onPress={_handleEndTimePress} >
             <ButtonTitle>{endTime? endTime :"공고를 마감할 시간을 입력하세요."}</ButtonTitle>
           </DateContainer>
            <DateTimePicker visible={endTimeVisible} mode="time" handleConfirm={_setEndTime} handleCancel={_hideEndTimePicker}/>

            <RadioContiner style={{marginBottom: 2}}>
            <TripleLabel>내용</TripleLabel>
           </RadioContiner>

           
          <StyledTextInputs 
           value={content}
           onChangeText={text => setContent(text)}
           autoCapitalize="none"
           placeholder="추가 사항"
           autoCorrect={false}
           textContentType="none" // iOS only
           underlineColorAndroid="transparent" // Android only
           style={{height: 100, width: WIDTH * 0.9, marginTop: 2}}
           multiline
           />
          
          

        </Container>
            <AdditionContainer></AdditionContainer>
        <Container>
          <InfoLabel>추가 정보</InfoLabel>
        <RadioContiner>
           <DoubleLabel>평균 성별</DoubleLabel>
            <DoubleLabel>평균 연령대</DoubleLabel>
           </RadioContiner>
            <AddContainer>
           <DropDownPicker 
              open={open1}
              value={selectedAge}
              items={ages}
              setOpen={setOpen1}
              setValue={setSelectedAge}
              setItems={setAges}
              containerStyle={{width: WIDTH*0.43, alignSelf: "flex-start"}}
              placeholder="평균연령대"
              placeholderStyle={{color: theme.label, fontSize: 16}}
              listMode="SCROLLVIEW"
              /> 
            
          <DropDownPicker 
              open={open2}
              value={selectedSex}
              items={sexes}
              setOpen={setOpen2}
              setValue={setSelectedSex}
              setItems={setSexes}
              containerStyle={{width: WIDTH*0.43, alignSelf: "flex-start"}}
              placeholder="평균성별"
              placeholderStyle={{color: theme.label, fontSize: 16}}
              listMode="SCROLLVIEW"
              />  
              </AddContainer>

            
        </Container>
        </KeyboardAwareScrollView>
    );
};


export default RegisterAuction;