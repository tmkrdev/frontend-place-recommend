import React from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCard } from "../../store/SelectedCards";

const {Option} = Select;

const AskAge = () => {

    const styles = {
        base: {
            // "marginLeft":"10px",
            "display" : "flex",
            "bottom": 0,
            "left" : 10,
            "opacity": "90%",
            "letterSpacing": "1.3px",
            "height": "50%",
            // "width": "100%",
            "overflowY": "hidden",
            "flex-direction" : "column",
            alignItems: 'flex',
            justifyContent: 'flex'
        },
        range : {
            width : "100%"
        }
    };

    let age_group = useSelector(s => s.selectedCards['age_group']);
    const dispatch = useDispatch();

    const setAge = (ageGroup) => {
        dispatch(setSelectedCard("age_group", ageGroup));
        window
            .localStorage
            .setItem('age_group', [ageGroup]);
    };
    
    if (!age_group) {
        age_group = window
            .localStorage
            .getItem('age_group')
    }

    const onChangeAge = (value) => {
        setAge([value]);
        window.dataLayer.push({event: 'selectAgeGroup', selectedElement: value});

    };

    return (

        <div className="askAge" style={styles.base}>
            <div className="site-input-number-wrapper">
                <Select
                    defaultValue={age_group}
                    style={styles.range}
                    onChange={onChangeAge}>
                    <Option value="10대">10대</Option>
                    <Option value="20대">20대</Option>
                    <Option value="30대">30대</Option>
                    <Option value="40대">40대</Option>
                    <Option value="50대">50대</Option>
                </Select>
            </div>

        </div>
    )
};

export default AskAge;