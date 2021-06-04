import React,{useState} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const DateTimePicker = ({handleConfirm,mode, visible, handleCancel}) => {
    
    return (
        <>
           <DateTimePickerModal 
            isVisible={visible}
            mode={mode}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
           />    
        </>
    )
};

export default DateTimePicker;