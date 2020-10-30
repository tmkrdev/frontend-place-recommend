import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedCard } from "../../store/SelectedCards";
import { Select } from 'antd';

const {Option} = Select;

const AskGender = () => {

    const styles = {
        base: {
            "bottom": 0,
            "right": 10,
            "opacity": "90%",
            "letterSpacing": "1.3px",
            "height": "50%",
            "width": "100%",
            "overflowY": "hidden",
            "flex-direction" : "column",
            display: 'flex',
            alignItems: 'flex',
            justifyContent: 'flex'
        },
        range : {
            width: "100%"
        }
    };
    
    let gender =  useSelector(s => s.selectedCards['gender']);
    if (!gender) {
        gender = window.localStorage.getItem('gender');
    }
    const dispatch = useDispatch();

    const onChangeGender = (value) => {
        dispatch(setSelectedCard("gender", [value]));
        window.localStorage.setItem('gender', [value]);
        // 구글 애널리틱스를 위한 value 삽입 
        window.dataLayer.push({event: 'selectGender', selectedElement: value});
    }

    return (
        <div className="askGender" style={styles.base}>
            <div className="site-input-number-wrapper">
            <Select style={styles.range} defaultValue={gender} onChange={onChangeGender}>
                <Option value="남자">남자</Option>
                <Option value="여자">여자</Option>
            </Select>
            </div>
        </div>
    )

};

export default AskGender;