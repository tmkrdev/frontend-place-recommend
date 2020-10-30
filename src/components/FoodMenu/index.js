import React from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCard } from "../../store/SelectedCards";


const { Option } = Select;
const FoodMenu = () => {

    const styles = {
        base: {},
        range: {
            width: "100%"
        }
    };

    const dispatch = useDispatch();
    const menu = useSelector(s => s.relation['menu']);
    const userSelectedMenu = useSelector(s => s.selectedCards['menu']);

    const children = [];
    for (let idx in menu) {
        children.push(
            <Option key={menu[idx]}>{menu[idx]}</Option>
        );
    }

    const setFooodMenu = (menu) => {
        dispatch(setSelectedCard("menu", menu));
    };

    const handleChange = (value) => {
        setFooodMenu(value);
        window.dataLayer.push({event: 'selectEntity', selectedElement: value});
        // console.log(`selected ${value}`);
    }

    return (
        <Select
            placeholder=""
            mode="tags"
            style={styles.range}
            defaultValue={userSelectedMenu}
            onChange={handleChange}
            tokenSeparators={[',', ' ']}>
            {children}
        </Select>
    )
};

export default FoodMenu;