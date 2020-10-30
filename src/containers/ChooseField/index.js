import React, { useEffect } from "react";
import { Badge } from 'antd';
import { HeartFilled} from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import Relation from "../../components/Relation";
import Header from "../../components/Header"
import AdsBanner from "../../components/AdsBanner"
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../components/Header/GlobalStyle";
import { useDarkMode } from "../../components/useDarkMode";
import { lightTheme, darkTheme } from "../../components/Header/Themes";
// 추천 결과 리스트 , 그에 대한 지도(마커), 사용자가 선택했던 카드 초기화
import { initRecResultList } from "../../store/RecResultList";
import { initMarkerAndOvl } from "../../store/RecMap";
import Burger from "../../components/Menu/Burger";
import { v4 as uuidv4 } from 'uuid';
import { saveUserId } from "../../api/mongodb";
import { saveUserInstantId } from "../../store/UserInfo";
import RecButton from "../../components/RecButton"


const ChooseField = ({history}) => {
    const [theme, mountedComponent] = useDarkMode();
    const styles = {
        topElements: {
            "cursor" : "pointer",
            fontWeight: "bold",
            'color': theme === 'dark'
                ? 'white'
                : '#6e6e7a',
            'textShadow': theme === 'dark'
                ? '0 0 4px rgb(148, 126, 126), 0 0 5px #fff, 0 0 5px #617e9c, 0 0 5px #2a598b, 0 0 ' +
                        '5px #7895B3, 0 0 5px #486A8B, 0 0 5px #486A8B'
                : '10px 10px 10px #FAF0E6'
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
            cursor:"pointer",
            height: "100%", 
            width:"100%",
            display : "flex",
            fontSize : "30px",
            alignItems : "center",
            justifyContent: "center", 
            color:"#eb2f96"
        },
        topLeftWrapper : {
            display:"flex", 
            alignContent:"space-between"
        }
    }

    const relations = useSelector((state) => state.relation);
    const favPlace = useSelector((state) => state.FavPlaces.data) || {};
    const favPlaceTitle = useSelector((state) => state.FavPlaces.title) || {};


    const dispatch = useDispatch();
    // userId 생성 
    const genUserInsId = 'guest_'.concat(uuidv4());
    let getUserId = async (userId)=> saveUserId(userId); // 생성된 user_id 를 mongodb 에 저장
    let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 

    useEffect(() => {
        (async() => {
            if (!userInstantId){
                dispatch(saveUserInstantId(genUserInsId));
            }
            dispatch(initRecResultList());
            dispatch(initMarkerAndOvl());
        })()
    }, []);

    if (userInstantId){
        getUserId(userInstantId); 
    }

    const themeMode = theme === "light"
        ? lightTheme
        : darkTheme; // 테마

    if (!mountedComponent) 
        return <div/>

    const goHome = () => {
        window.dataLayer.push({event: 'goHome', selectedElement: '홈 버튼'});
        // home 화면으로 가.ㅁ 새로 고침 
       history.push('/');
    }
    
    const Center = () => {
        return <div style={styles.topElements}
                    className="title" onClick={goHome}>🎈핫플고</div>
    }

    const Left = () => {
        return (
            <div style={styles.topLeftWrapper}>
                <Burger/>
            </div>
        )
        
    }

    const goLikePage = () => {
        window.dataLayer.push({event: 'selectEntity', selectedElement: "찜목록 확인"});
        history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace)) + '/"' +  favPlaceTitle +  '"');
        // history.go(0);
    }

    const LikedBadge = () => {
        return  (
            <Badge size="small"  count={Object.keys(favPlace).length} style={styles.likedBadge} onClick={goLikePage} showZero>
                    <HeartFilled style={styles.topHeartShape} twoToneColor="#eb2f96" />
            </Badge>
        )
    }

    const Right = () => {
        return(
            <div style={styles.topLeftWrapper}>
                <LikedBadge />
            </div>
        )
    }

    const ClickLeft = () => {
    }

    return (
        <>
            <ThemeProvider theme={themeMode}>
            <GlobalStyles/>
            <Header Center={Center} Left={Left} Right={Right} ClickLeft={ClickLeft}/>
            <AdsBanner/> 
            {/* -----ChooseField / 폴더  : <br/>
                        상단에는 광고 배너를 띄워주고 <br/> 하단에 배민식으로
                        아이콘 배열 예정 */}
            <Relation relations={relations} theme={theme}/>
            <RecButton history={history}/>
            <footer></footer>
            </ThemeProvider> 
        </>
            );
    }
export default ChooseField;