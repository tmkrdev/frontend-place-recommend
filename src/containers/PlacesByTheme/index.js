import React, { useEffect } from "react";
import { Badge } from 'antd';
import { HeartFilled, FilterTwoTone } from '@ant-design/icons';
import { useSelector , useDispatch} from "react-redux";
import Header from "../../components/Header";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../components/Header/GlobalStyle";
import { useDarkMode } from "../../components/useDarkMode";
import { lightTheme, darkTheme } from "../../components/Header/Themes";
import { useHistory } from 'react-router-dom';
import  { RecMap } from "../../components/RecMap"
import { PlaceByThemeList } from "../../components/PlaceByThemeList";
import Burger from "../../components/Menu/Burger";
import { setPlacesByTheme } from '../../store/PlacesByTheme';
import BottomNav from "../../components/BottomNav";
import { getPlaceByTheme } from '../../api/places';


const PlacesByTheme = (props) => {

  const history = useHistory();
  const [theme] = useDarkMode();


  const themeMode = theme === "light"
    ? lightTheme
    : darkTheme; // 테마

  const styles = {

    topElements: {
      "cursor" : "pointer",
      'textDecoration': 'blink',
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
      display : "flex",
      alignItems : "center", 
      justifyContent: "center", 
      backgroundColor : "#e6f7ff",
      border : "1px solid #1890FF",
      color : "#1890ff",
      marginTop : "9px",
      marginRight : "-3px"
    },
    topHeartShape : {
        height: "100%", 
        width:"100%",
        display : "flex",
        fontSize : "30px",
        alignItems : "center",
        color:"#eb2f96",
        justifyContent: "center"
    },
    countLike : {
      fontSize : "medium",
      fontWeight : "bold",
      paddingTop : "43px",
      paddingBottom : "2px",
      marginLeft : "15px",
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
    places = {},
    favPlace = {},
    favePlaceTitle = ""
  } = useSelector((s) => ({
    places: s.PlacesByTheme.data,
    favPlace : s.FavPlaces.data,
    favePlaceTitle : s.FavPlaces.title
  }));

  const themeSentence = JSON.parse(props.match.params.themeSentence);

  useEffect(() => {
    (async() => {
      if (!themeSentence.length) {
          props
              .history
              .push('/');
          return
      }
      
      let result = await getPlaceByTheme(themeSentence);
      if (result){
        dispatch(setPlacesByTheme(result));
      }
      if (!result){
        props.history.push('/');
      }})()
  }, []);

  const goHome = () => {
    
    window.dataLayer.push({event: 'goHome', selectedElement: '홈 버튼'});
    // home 화면으로 가.ㅁ 새로 고침 
    history.push('/');
  }

  const Center = () => {
    return <div style={styles.topElements} onClick={goHome} className="title">🎈핫플고</div>
  }
  const Left = () => {
    return <Burger/>
  }

  const goLikePage = () => {
    window.dataLayer.push({event: 'selectEntity', selectedElement: "찜목록 확인"});
    props.history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace))+ '/"' + favePlaceTitle + '"');
}

  const LikedBadge = () => {
    return  (
        <Badge size="small"  count={Object.keys(favPlace).length} style={styles.likedBadge} onClick={goLikePage}  showZero>
            <HeartFilled style={styles.topHeartShape}  twoToneColor="#eb2f96" />
        </Badge>
    )
  }

  const Right = () => {
    return (
        <div style={styles.topLeftWrapper}>
            
            <LikedBadge />
        </div>
    )
  }

  const ClickLeft = () => {
  }

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

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Header Center={Center} Left={Left} Right={Right} ClickLeft={ClickLeft} />
        <div style={styles.countLike}>
        {themeSentence}</div>
        {/* <UserPick search_query={search_query} check={"themePage"}/> */}
        <RecMap places={places}/>
        <PlaceByThemeList places={places}/>
        {!Object.keys(places).length
            ?
            <BottomNav 
              clickFilter={clickFilter}
              FilterIcon={FilterIcon}
              clickLikes={clickLikes}
              LikesIcon={LikesIcon}
            />:<></>
            }
        
    </ThemeProvider>
    </>
  )
}

export default PlacesByTheme