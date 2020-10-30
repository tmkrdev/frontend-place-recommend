import { useSelector, useDispatch } from 'react-redux';
import { Badge , Input, Button, Select} from 'antd';
import { HeartFilled, FilterTwoTone, SearchOutlined, SmileOutlined, LinkOutlined, ShareAltOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import RecList from "../../components/RecList";
import UserPick from "../../components/UserPick";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import { useDarkMode } from "../../components/useDarkMode";
import { callRecResultList } from '../../store/RecResultList'
import { onOpenFlash, onCloseFlash } from '../../store/base'
import { getPlace , getPlaceNameAll } from '../../api/places';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../components/Header/GlobalStyle"
import { lightTheme, darkTheme } from "../../components/Header/Themes";
import Burger from '../../components/Menu/Burger';
import LoadingScreen from 'react-loading-screen';
import { saveUserInstantId } from "../../store/UserInfo";
import { saveUserId, clickShareButton  } from "../../api/mongodb";
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';
import '../../styles/popup.css';

const RecResultListContainer = (props) => {

    const search_query = props.location.pathname.slice(13, props.location.pathname.length);
    // const search_query = props.match.params.userSelectedCards;
    const [theme] = useDarkMode();
    const themeMode = theme === "light"
        ? lightTheme
        : darkTheme; // 테마
    const { Search } = Input;
    const styles = {
        topElements: {
            "cursor" : "pointer",
            'textDecoration' : 'blink',
            fontWeight: "bold",
            'color':'#6e6e7a',
            'textShadow': '10px 10px 10px #FAF0E6'
        },
        likedBadge : {
            display : "flex",
            alignItems : "center", 
            justifyContent: "center", 
            marginTop : "9px",
            backgroundColor : "#e6f7ff",
            color : "#1890ff",
            fontWeight : "bold",
            fontSize : "small",
            border : "1px solid #1890FF"
        },

        searchBar : {
            display : "flex",
            alignItems : "center", 
            justifyContent: "center", 
            color : "#000000a6",
            fontSize:"big",
            letterSpacing : "1.9px",
        },
        shareButton : {
            color : "#000000a6",
            fontSize:"86%"
        },

        topHeartShape : {
            cursor : "pointer",
            height: "100%", 
            color:"#eb2f96",
            width:"100%",
            display : "flex",
            fontSize : "30px",
            alignItems : "center",
            justifyContent: "center"
        },
        topLeftWrapper : {
            display:"flex", 
            alignContent:"space-between"
        },
        bottomFilterIcon: {
            fontSize : "30px"
        }
        }    
    
    let dispatch = useDispatch();

    const {
        favPlace = {},
        favePlaceTitle = "",
        recResultList = [],
    } = useSelector((s) => ({
        favPlace: s.FavPlaces.data,
        favePlaceTitle :  s.FavPlaces.title,
        recResultList: s.RecResultList.data,
    }));
    // 데이터 받아옴.


    let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 
    const genUserInsId = 'guest_'.concat(uuidv4());
    let getUserId = async (userId)=> saveUserId(userId); // 생성된 user_id 를 mongodb 에 저장


    const [placeNames,  allPlaceNames] = useState("");
    useEffect(() => {
        (async() => {
            if (!userInstantId){
                dispatch(saveUserInstantId(genUserInsId));
            }
            if (!search_query.length) {
                props
                    .history
                    .push('/');
                return
            }
            //let result = await getPlace(selectedCards);
            let result = await getPlace(search_query);
            let getAllPlaceName = await getPlaceNameAll();
            if (result && result.length) {
                dispatch(onOpenFlash({title: '결과조회 성공', body: '결과 ' + result[0].length + '개'}));
                dispatch(callRecResultList(result));
                setTimeout(() => {
                    dispatch(onCloseFlash());
                }, 788);
            } else {
                props
                    .history
                    .push('/'); 
            }
            if (getAllPlaceName){
                allPlaceNames(getAllPlaceName);
            }
        })()
    }, [search_query]);

    if (userInstantId){
        getUserId(userInstantId); 
    }

    const Center = () => {
        return <div style={styles.topElements} className="title">장 소 후 보</div>;
    };

    const Left = () => {
        return(
                <div style={styles.topLeftWrapper}>
                    <Burger/>
                </div>
            ) 
    };

    const goLikePage = () => {
        window.dataLayer.push({event: 'selectEntity', selectedElement: "찜목록 확인"});
        props.history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace)) + '/"' + favePlaceTitle + '"');
    }

    const linkCopied = () => {
        const nowPageLink = "http://localhost:3000"+props.location.pathname;
        window.dataLayer.push({event: 'clickShareBtn', selectedElement: props.location.pathname});
        clickShareButton(userInstantId,props.location.pathname);
        navigator.clipboard.writeText(nowPageLink);
        dispatch(onOpenFlash({title: "링크 복사 완료", body:  <div style={{"fontSize":"70%"}}>링크 복사 완료!<LinkOutlined/></div> }));
        setTimeout(() => {
            dispatch(onCloseFlash());
        }, 1000);
    }
    const { Option } = Select;

    const children = [];
    for (let idx in placeNames) {
        children.push(
            <Option key={placeNames[idx]}>{placeNames[idx]}</Option>
        );
    }

    const handleChange = (value) =>{
        props.history.push('/reco/result/' + JSON.stringify({"name":value}));
    }
    
    const Right = () => {
        return (
            <div style={styles.topLeftWrapper}>
                <div style={styles.searchBar}>
                    
                    <Popup trigger={<SearchOutlined />} 
                      modal
                      nested
                    >
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                            <div className="header">장소 이름 <SmileOutlined/></div>
                            <div className="content" style={{width:"100%"}}>
                                <Select size="large" 
                                    mode="tags"
                                    allowClear
                                    onChange={handleChange}
                                    placeholder="ex)노량진수산시장"
                                    style={{width:"80%", borderRadius:"10px"}}
                                >
                                {children}
                                </Select>
                                <SearchOutlined
                                    style={{width:"20%", fontSize:"20px", "cursor":"pointer"}}
                                />
                            </div>
                            <div className="actions">
                            </div>
                        </div>
                        )}
                    </Popup>
                </div>
                <ShareAltOutlined style={styles.shareButton} onClick={linkCopied}/>
            </div>
        )
    };

    const ClickLeft = () => {

    };

    const LikesIcon = () => {
        return ( 
        <Badge size="small"  count={Object.keys(favPlace).length} style={styles.likedBadge} onClick={goLikePage} showZero>
            <HeartFilled style={styles.topHeartShape}  twoToneColor="#eb2f96" />
        </Badge>
        )
    }

    const FilterIcon = () => {
        return ( 
            <FilterTwoTone style={styles.bottomFilterIcon}  />
        )
    }
    
    const clickFilter = () => {
         // home 화면으로 가.ㅁ 새로 고침 
        props.history.push('/enter/preference');
    };

    const clickLikes = () => {
         // home 화면으로 가.ㅁ 새로 고침 
         window.dataLayer.push({event: 'selectEntity', selectedElement: "찜목록 확인"});
         props.history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace)) + '/"' + favePlaceTitle + '"');
    };



    // if (!recResultList.length || !Object.keys(selectedCards).length) {
    if (!recResultList ) {
        return (
            <LoadingScreen
                loading={true}
                bgColor='#F8F8FF'
                spinnerColor='#1890ff'
                textColor='#1890ff'
                logoSrc='/Loading.png'
                text='♪☁️ ☀️ 🚶☀️  💡♪'
            > 
            </LoadingScreen>
        )
    }


    return ( 
        <>
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <Header Center={Center} Left={Left} Right={Right} ClickLeft={ClickLeft} />
                <div className="recoResultList">
                    <div style={
                        {
                            "marginBottom" : "101.2px"
                         }}>
                    <UserPick search_query={search_query} check={"recoPage"} />
                    </div>
                    <div>
                    <RecList search_query={search_query} history={props.history}/>
                    </div>
                </div>
            <BottomNav clickFilter={clickFilter} FilterIcon={FilterIcon} clickLikes={clickLikes} LikesIcon={LikesIcon}/>
        </ThemeProvider>
        </>
        );
    };

    export default RecResultListContainer;