import React, {useState, useEffect, useRef} from "react";
import {addSelectedCard, delSelectedCard} from "../../store/SelectedCards";
import {saveUserCards, delUserCards} from "../../api/mongodb";
import {useSelector, useDispatch} from "react-redux";
import {Tag} from 'antd';
import { animateScroll as scroll } from 'react-scroll'

const Cards = ({relName, value}) => {

    const divRef = useRef(null);

    useEffect(() => {
    });

    const dispatch = useDispatch();
    let saveAddCards = async(user_id, relName, value) => saveUserCards(userInstantId, relName, value); // relName : value 이렇게 저장해야 하는 데
    let saveDelCards = async(user_id, relName, value) => delUserCards(userInstantId, relName, value); // relName : value 이렇게 저장해야 하는 데

    let userInstantId = useSelector((state) => state.UserInfo.userInstantId);
    let selectedCards = useSelector((s) => s.selectedCards);

    const AllLoc = useSelector((state) => state.relation["location"]);

    const addCard = () => {
        if (selectedCards[relName]) {
            if (!selectedCards[relName].includes(value)) {
                dispatch(addSelectedCard(relName, value));
                saveAddCards(userInstantId, relName, value);
                window
                    .dataLayer
                    .push({event: 'selectEntity', selectedElement: value});
            }
        } else {
            dispatch(addSelectedCard(relName, value));
            saveAddCards(userInstantId, relName, value); 
            window
                .dataLayer
                .push({event: 'selectEntity', selectedElement: value});
        }
    }

    const delCard = () => {
        if (selectedCards[relName]) {
            if (selectedCards[relName].includes(value)) {
                dispatch(delSelectedCard(relName, value));
                saveDelCards(userInstantId, relName, value);
                window
                    .dataLayer
                    .push({event: 'deselectEntity', selectedElement: value});
            }
        }
    }

    const addAllCard = () => {
        for (let eachLoc of AllLoc) {
            if (selectedCards[relName]) {
                if (!selectedCards[relName].includes(eachLoc)) {
                    dispatch(addSelectedCard(relName, eachLoc));
                    saveAddCards(userInstantId, relName, eachLoc); // location : 'ALL'
                }
            } else {
                dispatch(addSelectedCard(relName, eachLoc));
                saveAddCards(userInstantId, relName, eachLoc); // location : 'ALL'
            }
        }
        window
            .dataLayer
            .push({event: 'selectLocAllBtn', selectedElement: 'ALL'});
    }

    const delAllCard = () => {
        for (let eachLoc of AllLoc) {
            if (selectedCards[relName]) {
                if (selectedCards[relName].includes(eachLoc)) {
                    dispatch(delSelectedCard(relName, eachLoc));
                    saveDelCards(userInstantId, relName, eachLoc);

                }
            }
        }
        window
            .dataLayer
            .push({event: 'deselectLocAllBtn', selectedElement: 'ALL'});
    }

    let wasSelected = false;
    if (selectedCards[relName]) {
        if (selectedCards[relName].includes(value)) {
            wasSelected = true;
        } else {
            wasSelected = false;
        }
    }
    const [isOn,
        setIsOn] = useState(selectedCards[relName]
        ? selectedCards[relName].includes(value)
        : false); // 초기에는 false
 
    const checkIsOn = () => {
        (relName === "location")
            ?scroll.scrollTo(190)
        :(relName === "category")
            ?scroll.scrollTo(600)
        :(relName === "menu")
            ?scroll.scrollTo(700)
        :(relName === "media")
            ?scroll.scrollTo(700)
        :(relName === "mood")
            ?scroll.scrollTo(900)
        :(relName === "theme")
            ?scroll.scrollTo(1200)
        :scroll.scrollToBottom()

        setIsOn(!isOn);
        isOn
            ? delCard()
            : addCard();
    };

    const checkAllIsOn = () => {
        scroll.scrollTo(500);
        setIsOn(!isOn);
        isOn
            ? delAllCard()
            : addAllCard();
    };

    const style = {
        "whiteSpace": "pre-wrap",
        "word-break": "keep-all",
        boxShadow : '0 1px 1px -1px rgba(0, 0, 0, 0.12), 0 1.5px 1.5px 0 rgba(0, 0, 0, 0.08),0 1.5px 1px 1px rgba(0, 0, 0, 0.05)',
        // fontWeight: "bold",
        fontSize: "medium",
        letterSpacing : "1.9px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        listStyleType: "none",
        width: "30%",
        borderRadius: "10px",
        padding: "5px",
        marginBottom: "15px",
        "cursor": "pointer",
        opacity: 0.9,
        "overflow": "hidden",
        color : wasSelected ? 
            "white" : "#000000a6",
        backgroundColor : wasSelected ? 
            "#5F9BE0" : "#f0f5ff"
    }

    return (value === "ALL"
        ? <Tag
                ref={divRef}
                style={style}
                size="big"
                onClick={checkAllIsOn}>{value}</Tag>
        : <Tag
            ref={divRef}
            style={style}
            size="big"
            onClick={checkIsOn}>{value}</Tag>);
};

export default Cards;
