import React, { useEffect } from "react";
import { Badge } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import { ThemeProvider } from "styled-components";
import { onOpenFlash, onCloseFlash } from '../../store/base'
import { GlobalStyles } from "../../components/Header/GlobalStyle";
import { useDarkMode } from "../../components/useDarkMode";
import { lightTheme, darkTheme } from "../../components/Header/Themes";
import PlDesc from "../../components/PlDesc";
import { LinkOutlined, ShareAltOutlined, FilterTwoTone , HeartFilled, UnorderedListOutlined } from '@ant-design/icons';
import Burger from "../../components/Menu/Burger";
import {saveUserId, clickShareButton  } from "../../api/mongodb";
import { v4 as uuidv4 } from 'uuid';
import { saveUserInstantId } from "../../store/UserInfo";
import BottomNav from "../../components/BottomNav";


const PlDetailContainer = (props) => {

    const [theme,mountedComponent] = useDarkMode();
    const themeMode = theme === "light" 
        ? lightTheme : 
          darkTheme; // 테마 
    
    const styles = {
        topElements: {
            "cursor" : "pointer",
            'textDecoration' : 'blink',
            fontWeight: "bold",
            'color': theme === 'dark'
                ? 'white'
                : '#6e6e7a',
            'textShadow': theme === 'dark'
                ? '0 0 4px rgb(148, 126, 126), 0 0 5px #fff, 0 0 5px #617e9c, 0 0 5px #2a598b, 0 0 ' +
                        '5px #7895B3, 0 0 5px #486A8B, 0 0 5px #486A8B'
                : '10px 10px 10px #FAF0E6'
        }, 
        errorStyles :{
            "fontSize" : "large",
            "letterSpacing": "1.3px",
            'marginTop':"100px",
            'flexDirection': 'column',
            'display': 'flex',
            'alignItems' : 'center'
        },
        likedBadge : {
            cursor:"pointer",
            color : "#1890ff",
            display : "flex",
            alignItems : "center", 
            justifyContent: "center", 
            backgroundColor : "#e6f7ff",
            border : "1px solid #1890FF",
            marginTop : "9px",
            marginRight : "-3px"
        },
        topHeartShape : {
            cursor : "pointer",
            height: "100%", 
            width:"100%",
            color:"#eb2f96",
            display : "flex",
            fontSize : "30px",
            alignItems : "center",
            justifyContent: "center"
        },
        topLeftWrapper : {
            display:"flex", 
            alignContent:"space-between"
        },
        shareButton : {
            color : "#000000a6",
            fontSize:"86%"
        },
        bottomFilterIcon: {
            fontSize : "30px"
        }
    }

    let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 
    const {
        favPlace = {},
        favePlaceTitle = "",
        selectedCards={}
      } = useSelector((s) => ({
        favPlace : s.FavPlaces.data,
        favePlaceTitle : s.FavPlaces.title,
        selectedCards: s.selectedCards
      }));
    const genUserInsId = 'guest_'.concat(uuidv4());
    let getUserId = async (userId)=> saveUserId(userId); // 생성된 user_id 를 mongodb 에 저장


    useEffect(() => {
        (async() => {
            if (!userInstantId){
                dispatch(saveUserInstantId(genUserInsId));
            }
        })()
    }, []);

    if (userInstantId){
        getUserId(userInstantId);  /// 어차피 몽고디비에서 user_id 가 있으면, 저장을 하지 않음 
    }

    let dispatch = useDispatch();

    if (!mountedComponent) return <div/>

    const Center = () => {
        let placeName = props.match.params.placeName;

        return <div style={styles.topElements} className="title">
            {placeName
                ? placeName
                : '상세 페이지'}</div>
    }

    const Left = () => {
        return <Burger/>
    };

    const linkCopied = () => {
        const nowPageLink = "http://localhost:3000"+ props.location.pathname;
        window.dataLayer.push({event: 'clickShareBtn', selectedElement: props.location.pathname});
        navigator.clipboard.writeText(nowPageLink);
        clickShareButton(userInstantId, props.location.pathname);
        dispatch(onOpenFlash({title: '결과조회 성공', body:  <div style={{"fontSize":"70%"}}>링크 복사 완료!<LinkOutlined/></div> }));
        setTimeout(() => {
            dispatch(onCloseFlash());
        }, 1300);
    }  

    const Right = () => {
        return (
            <div style={styles.topLeftWrapper}>
                {/* <LikedBadge /> */}
                <ShareAltOutlined style={styles.shareButton} onClick={linkCopied}/>
            </div>
        )
    } 
    
    const ClickLeft = () => {
    }

    const goLikePage = () => {
        props.history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace)) + '/"' + favePlaceTitle + '"');
        window.dataLayer.push({event: 'selectEntity', selectedElement: "찜목록 확인"});
    }

    const LikesIcon = () => {
        return ( 
        <Badge size="small" count={Object.keys(favPlace).length} style={styles.likedBadge} onClick={goLikePage} showZero>
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
        props.history.push('/enter/preference');
    };

    const clickLikes = () => {
        window.dataLayer.push({event: 'selectEntity', selectedElement: "찜목록 확인"});
        props.history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace)) + '/"' + favePlaceTitle + '"');
    };

    const ListIcon = () => {
        return ( 
            <UnorderedListOutlined style={styles.bottomFilterIcon}  />
        )
    }

    const clickList = () => {
        // 기존 클릭 카드가 있었다면 , 그것에 맞게 이동 | 아니라면 남자 , 여자 카드가 클릭된 상태로 이동한다. 
        if (Object.keys(selectedCards).length){
            props.history.push('/reco/result/' +   JSON.stringify(selectedCards));
        }
        else{
            props.history.push('/reco/result/' + '%7B"gender":["남자","여자"]%7D');
        } 
    }

    return (
        <>
            <ThemeProvider theme={themeMode}>
            <GlobalStyles/>
            <Header Center={Center} Left={Left} Right={Right} ClickLeft={ClickLeft}/>
            <PlDesc placeName={props.match.params.placeName}  history={props.history} />
            <BottomNav 
              clickFilter={clickFilter}
              FilterIcon={FilterIcon}
              clickList={clickList}
              ListIcon={ListIcon}
              clickLikes={clickLikes}
              LikesIcon={LikesIcon}
            />
            </ThemeProvider>
        </>
        )
};
export default PlDetailContainer;