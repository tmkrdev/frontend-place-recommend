import React from "react";
import { Divider, Typography, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Checkbox } from 'antd';
import { setWhloeSelectedCard } from "../../store/SelectedCards";
import Popup from 'reactjs-popup';
import '../../styles/popup.css';
import '../../styles/antd.checkbox.css';
// import handleAgeGroup from './handleFunc';

const styles = {
    dividerTitle: {
        fontSize: 'medium',
        color : "#0b1016",
        fontWeight: "bold",
        marginBottom: "0",
        marginTop: "1%",
        top : "0",
        bottom: "0"
    },
    userPickTags: {
        'background' : "#F8F8FF",
        'marginTop': "36px",
        "position" : "fixed",
        "justifyContent": "space-between", 
        maxHeight: "5.4rem",
        "overflow": "scroll",
        "top" : 0,
        "left": 0,
        "right": 0,
        "width": "100vw",
        overflowX : "hidden",
        "boxShadow" : "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
        zIndex: 1,
        "marginBottom":"14px"
    },

    tags: {
        float: "bottom",
        fontSize: 'small',
    },

    sticky : {
        'position' : 'fixed',
        'top' : 0,
        "width" : "100%"
    },
    stickyWrapper : {
    "position" : "relative",
    "display":"flex",
    height :"auto"
    },

    topWrapper: {
        "display": "flex", 
        "alignItems" : "flex-start",
        "flex-direction" : "column",
    },
    selectBox : {
        fontSize : "14px",
        fontWeight : "bold",
        width: "auto",
        wrap:"soft",
        "wordWrap" : "break-word",
        "wordBreak" :"break-all",
        "minWidth":"17.3%", 
        marginLeft : "10px", 
        marginTop: "1px",
        marginBottom: "1px",
        overflowWrap: "break-word"
    },
    textBigger : {
        marginLeft : "10px", 
        fontSize :  "130%",
        fontWeight : "bold",
        marginTop: "50px",
        bottom : "10",
        marginBottom: "1px",
        overflowWrap: "break-word",
        backgroundColor: "#E0EBED"
    },
    keyword : {
        marginLeft: "20px",
         marginTop : "1px"
    },
    modalClose :{"float": "right", "margin" : "4%"}

}


const selectBox = (val) => ({
    fontSize : "14px",
    backgroundColor: val?
            "#e6f7ff":"transparent",
   color: val?
            "#000000a6":"#808080",
    fontWeight : val? "600":"light",
    width: "auto",
    wrap:"soft",
    "wordWrap" : "break-word",
    "wordBreak" :"break-all",
    "minWidth":"17.3%", 
    marginLeft : "10px", 
    marginTop: "1px",
    marginBottom: "1px",
    overflowWrap: "break-word"
});

export const UserPick = ({search_query, check}) => {
    const history = useHistory();
    let dispatch = useDispatch();
    const { Text } = Typography;
    
    const isJsonString = (str) => {
        let result = {}
        try {
            JSON.parse(str);
            result = JSON.parse(str);
        } catch (e) {
            result = {}
        }
        return result;
    }

    search_query = 
        check === "themePage"
        ?search_query
        :isJsonString(search_query)|| {}

    if (search_query['location'] && search_query['location'].length > 13){
        search_query['location'] = ['ALL']
    }

    const {
        relation = {},
    } = useSelector((s) => ({
        relation : s.relation,
    }));  // 결과 value 가져오고 

    let relArr = ["age_group" ,"location","gender", "category", "companion", "mood"];
    const relSet = (relName) => {
        let options = []
        let eachEle = relation[relName];
        for (let idx in eachEle){
            options.push(
                {"label" : eachEle[idx], "value" : eachEle[idx]}
            )
        }
        return options;
    }  

    const nameToKr = (value) => {
        let text = ''
        value === "age_group"? 
            text="나이대"
        :value === "gender"?
            text="성별"
        :value === "location"?
            text="위치" 
        :value === "category"?
            text="관심사"
        :value === "mood"?
            text="분위기"
        :value === "theme"?
            text="테마"
        :value === "companion"?
            text="동행인"
        :value === "menu"?
            text="메뉴"
        : text =""
        return text
    }

    const handleSelection = (value, eachRel) =>{
            if (!value.length){
                delete search_query[eachRel]
            } 
            else if (relation[eachRel].includes(value[0])){ // 해당하는 카테고리에 대해서만 
                if (eachRel === "location"){
                    if (relation["location"].includes(value[0])){
                        if ( value.length > 1 && value.includes("ALL")){
                            var allIdx = value.indexOf('ALL');
                            value.splice(allIdx, 1); // ALL 을 지운다.
                        }
                        search_query[eachRel] = value;
                    }
                }
                else {
                    search_query[eachRel] = value;
                }
            }
    }

    const refreshVal =() => {
        if(search_query.length)
            dispatch(setWhloeSelectedCard(search_query));
            history.push("/reco/result/" + JSON.stringify(search_query));
    }

    // 사용자가 선택한 것은 앞에, 선택하지 않은 것은 뒤에 오게 한다 
    relArr = relArr.filter(f => search_query[f]).concat(relArr.filter(f => !search_query[f]));      
    return (
        <>
        <div style={styles.stickyWrapper}>
            <div style={styles.userPickTags}>
            <Divider orientation="left" style={styles.dividerTitle}></Divider>
                {
                    search_query["name"]?
                        <>
                        <div>
                            <Text 
                                style={styles.textBigger}
                                disabled >
                                    {'"' + search_query["name"] + '"'}
                            </Text>
                        
                        </div>
                    </>
                    :
                    search_query["theme"]?
                        <>
                        <div>
                        
                            <Text 
                                style={styles.textBigger}
                                disabled >
                                    {'"' + search_query["theme"] + '"'}
                            </Text>
                        
                        </div>
                    </>
                    :
                    //  큐레이션 단계가 menu 이고, category 안에 맛집 혹은 알코올ㄹ이 있을 경우 에만 메뉴를 보여준다. 
                    relArr.map( (eachRel, index) => (
                    eachRel === "menu" && !(search_query["category"]?.includes("맛집") || search_query["category"]?.includes("주점"))?
                    <></>
                    :
                    <>

                        <Popup trigger={
                            <Tag
                                size='small'
                                placeholder={nameToKr(eachRel)}
                                defaultValue={search_query[eachRel]?search_query[eachRel]:[]}
                                style={selectBox(search_query[eachRel])}
                            >
                                {search_query[eachRel]?Object.values(search_query[eachRel]).join(','):nameToKr(eachRel)}
                            </Tag>
                        
                        } 
                        modal
                        nested
                        >
                        {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                &times;
                                </button>
                                <div className="content">
                                    <Checkbox.Group
                                        options={relSet(eachRel)} 
                                        defaultValue={search_query[eachRel]?search_query[eachRel]: []} 
                                        onChange={(e) => handleSelection(e, eachRel)}
                                    />
                                </div>
                                <Button
                                    type="primary"
                                    size="small" 
                                    style={styles.modalClose}
                                    onClick={
                                    () => {
                                        refreshVal();
                                        close();
                                      }
                                    }>
                                        확인
                                </Button>
                            </div>
                            )}
                        </Popup>
                        
                     

                    
                    </>

                    ))
                }

                
                
            </div>
        </div>
    </>
    )

}
export default UserPick;