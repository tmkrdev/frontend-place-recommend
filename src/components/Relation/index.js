import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Cards from "../Cards";
import AskAge from "../../components/UserInfo/AskAge";
import AskGender from "../../components/UserInfo/AskGender";
import FoodMenu from "../FoodMenu";

import { setSelectedCard } from "../../store/SelectedCards";

const Relation = (props) => {
    const dispatch = useDispatch();
    let getUserAgeGroup = useSelector(s => s.selectedCards['age_group']),
        getUserGender = useSelector(s => s.selectedCards['gender']);
    const isRestaurant = useSelector(s => s.selectedCards['category']);

    if (!getUserAgeGroup) {
        getUserAgeGroup = window
            .localStorage
            .getItem('age_group');
        if (getUserAgeGroup) {
            dispatch(setSelectedCard("age_group", [getUserAgeGroup]));
        }
    }

    if (!getUserGender) {
        getUserGender = window
            .localStorage
            .getItem('gender');
        if (getUserGender) {
            dispatch(setSelectedCard("gender", [getUserGender]));
        }

    }

    let relations = props.relations;
    let theme = props.theme;
    const styles = {
        nameToKr: {
            'color': theme === 'dark'
                ? '#F0F8FF'
                : '#808080',
            'fontSize': '18px',
            'fontWeight': 'bold',
            'paddingBottom': '10px',
        },
        cardWrapper: {
            margin : "auto",
            overflowY: "scroll",
            overflowX: "hidden",
            "display": "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            MozTextAlignLast: "justify",
            WebkitTextAlignLast: "justify",
            textAlignLast: "justify"
        },
        genderAgeWrapper : {
            display:"flex",
            justifyContent:"flex-start",
            margin : "auto",
            flexWrap: "wrap",
            MozTextAlignLast: "justify",
            WebkitTextAlignLast: "justify",
            textAlignLast: "justify",
            textAlign : "center"

        },
        searchBar : {
            display:"flex",
            marginTop : 40,
            justifyContent:"space-between",
            flexWrap: "wrap",
            MozTextAlignLast: "justify",
            WebkitTextAlignLast: "justify",
            textAlignLast: "justify",
            textAlign : "center"
        },
        range : {
            width: "100%"
        }
    }

    const nameToKr = (param) => {
        switch (param) {
            case 'companion':
                return '누구와 함께 가시나요?';
            case 'media':
                return '자주 보는 유투브 채널 있으신가요?';
            case 'location':
                return '어느 곳으로 가볼까요?';
            case 'category':
                return '관심사가 어떻게 되세요?';
            case 'mood':
                return '분위기도 놓칠 수 없어요';
            case 'age_group':
                return '당신의 연령대는?';
            case 'gender':
                return '당신의 성별은?';
            case 'menu':
                return '좋아하는 메뉴가 있다면?';
            case 'keyword':
                return '특색있는 키워드를 등록해봐요 🥺';
            default:
                return "";

        }
    }

    return (
        <div id="container">
            <div id="contents">
                {Object
                    .keys(relations)
                    .map((relName, idx) => (
                            <>
                            { relName === "category" && (isRestaurant?.includes("맛집") || isRestaurant?.includes("주점"))?
                                <>
                                    <div className="relation" key={idx}>
                                        <div className="head" style={styles.nameToKr}>
                                            {nameToKr(relName)}
                                        </div>
                                        <ul className="cards" style={styles.cardWrapper}>
                                            {Object
                                                .values(relations[relName])
                                                .map((value, index) => (<Cards key={index + value} relName={relName} value={value}/>))
                                            }
                                        </ul>
                                    </div>
                                    <div style={styles.searchBar}>
                                        <div style={styles.nameToKr}>
                                            {nameToKr("menu")}
                                        </div>
                                        <div style={styles.range}>
                                            <FoodMenu relName="menu"/>
                                        </div>
                                    </div>
                                    <div className="relation" key={idx}>
                                        <div className="head" style={styles.nameToKr}>
                                            {nameToKr("media")}
                                        </div>
                                        <ul className="cards" style={styles.cardWrapper}>
                                            {Object
                                                .values(relations["media"])
                                                .map((value, index) => (<Cards key={index + value} relName={"media"} value={value}/>))
                                            }
                                        </ul>
                                    </div>
                                </>
                                
                                :relName === "category"?
                                <div className="relation" key={idx}>
                                    <div className="head" style={styles.nameToKr}>
                                        {nameToKr(relName)}
                                    </div>
                                    <ul className="cards" style={styles.cardWrapper}>
                                        {Object
                                            .values(relations[relName])
                                            .map((value, index) => (<Cards key={index + value} relName={relName} value={value}/>))
                                        }
                                    </ul>
                                </div>
                                :relName !== 'category' && relName !== 'age_group' && relName !== 'gender' && relName !== "menu" && relName !== "media" && relName !== "theme"
                                ?
                                    <div className="relation" key={idx}>
                                        <div className="head" style={styles.nameToKr}>
                                            {nameToKr(relName)}
                                        </div>
                                        <ul className="cards" style={styles.cardWrapper}>
                                            {Object
                                                .values(relations[relName])
                                                .map((value, index) => (<Cards key={index + value} relName={relName} value={value}/>))
                                            }
                                        </ul>
                                    </div>
                                :<></>
                                
                            }
                            </>
                        
                    ))}
                    <div style={styles.genderAgeWrapper}> 
                        <div>                                 
                            <div style={styles.nameToKr}>
                                {nameToKr("age_group")}
                            </div>
                            <div style={styles.range}>
                                <AskAge />
                            </div>
                        </div>
                        <div style={{marginLeft : "10%"}}>
                            <div style={styles.nameToKr}>
                                {nameToKr("gender")}
                            </div>
                            <div style={styles.range}>
                                <AskGender />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Relation;
