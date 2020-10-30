import React, { useEffect, useState } from "react";
import { Badge, Button } from 'antd';
import { HeartFilled, HeartTwoTone,UnorderedListOutlined ,  FilterTwoTone, QuestionOutlined, LinkOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useSelector , useDispatch} from "react-redux";
import { Tag, Result } from 'antd';
import Header from "../../components/Header";
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../components/Header/GlobalStyle";
import { useDarkMode } from "../../components/useDarkMode";
import { lightTheme, darkTheme } from "../../components/Header/Themes";
import { BrowserRouter as Route,Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import  { RecMap } from "../../components/RecMap"
import Burger from "../../components/Menu/Burger";
import { setFavListByUri } from '../../store/FavPlacesByUri';
import { addFavPlace, delFavPlace, setFavPlaceTitle } from '../../store/FavPlaces';
import { addFavPlaceByUri, delFavPlaceByUri } from '../../store/FavPlacesByUri';
import { addUserFavPlace, delUserFavPlace } from '../../api/mongodb';
import { onOpenFlash, onCloseFlash } from '../../store/base';
import { getPlaceByName } from '../../api/places';
import {saveUserId, clickShareButton  } from "../../api/mongodb";
import { v4 as uuidv4 } from 'uuid';
import InlineInput from 'react-inline-input';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const checkTagColor = (value) => {
  let tagColor = {
      location: "geekblue",
      category: "green",
      age_group: "cyan",
      mood: "volcano",
      gender: "purple",
      menu: "red",
      theme : "black"
  };
  
  return tagColor[value] || 'geekblue';
}

const tagsList = (value, kind) => {
  let result = [];
  let tagColor = checkTagColor(kind);
  if (value){
  value.replace(" ", "").split(",").map((val, index) => {
      if(val && val !== '-') { 
      result.push(
          <Tag color={tagColor}
              style={{ float: "right", fontSize: "12px", margin: "3px", borderRadius : "10px" }}
              key={val+index}>#{val}</Tag>)
      }
  })
  }

  return result;
}


let mql = window.matchMedia('(max-width: 600px)');
let mqlLow = window.matchMedia('(max-width: 414px)');

let mobileView = mql.matches;

const Likes = (props) => {
  const history = useHistory();
  const [theme] = useDarkMode();
  const themeMode = theme === "light"
    ? lightTheme
    : darkTheme; // 테마

  const styles = {
    tags : {
      "backgroundColor" : "#f8f8ff",
      "display": "flex", 
      float: "bottom",
      fontSize: 'small',
      "flexWrap": "wrap",
    },
    list : {
        opacity : 1,
        position:"fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: mqlLow? "63%" : mobileView ? "61%" : "66%",
        "overflow" :"scroll",
    },
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
        justifyContent: "center",
        color:"#eb2f96"
    },
    countLike : {
      display : "flex",
      justifyContent:"space-between",
      overflow : "hidden", 
      marginTop : "43px",
      marginLeft : "10px",
      marginBottom : "2px"
    },
    fontBold : { fontWeight : "560", fontSize : "120%"},
    topLeftWrapper : {
        display:"flex", 
        alignContent:"space-between"
    },
    LikedWrapper : {
      "position": "absolute",
      "top": "8px",
      "right": "14px"
    },
    isLiked : {
      "color" : "#eb2f96",
      "fontSize": '30px',
      "textAlign" : "left"
    },
    placeOneline :{
      backgroundColor : "#f8f8ff",
      color:"#000000a6", 
      fontSize: "116%",
      transform: "skewX(-5deg)"
    },
    bottomFilterIcon: {
      fontSize : "30px"
    },
    shareButton : {
      color : "#000000a6",
      fontSize:"86%"
    },
    container : {
      "position": "relative",
      "text-align": "center",
      "color": "white"
    },
    setbgColor : {
      backgroundColor : "#f8f8ff"
    },
    likeSum:{
      marginRight:"10px",
      fontWeight : "light"
    },
    marginRight : {marginRight:"10px", fontWeight : "bold"},
    marginLeft :{marginLeft:"10px"},
    fontSize : {fontSize : "10px"},
    overFlowHidden : {overflow:"hidden"},
    marginTop : {"marginTop":"20px"}
    
  }

  const listImgStyles = (image) => ({
    height: '120px',
    width: '120px',
    lineHeight: '160px',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: "center",
    backgroundImage: 'url(' + image + ')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    "boxShadow": "1px 2px 3px #808080"
});

  let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 
  const genUserInsId = 'guest_'.concat(uuidv4());
  let getUserId = async (userId)=> saveUserId(userId); // 생성된 user_id 를 mongodb 에 저장

  const {
    selectedCards={}
  } = useSelector((s) => ({
    selectedCards: s.selectedCards
  }));

  if (userInstantId){
      getUserId(userInstantId);  /// 어차피 몽고디비에서 user_id 가 있으면, 저장을 하지 않음 
  }

  let dispatch = useDispatch();

  const {
    favPlace = {},
    favePlaceTitle = "",
    favPlaceByUri = {}
  } = useSelector((s) => ({
    favPlace : s.FavPlaces.data,
    favPlaceByUri: s.FavPlacesByUri.data,
    favePlaceTitle : s.FavPlaces.title
  }));

  const isJsonString = (str,cat) => {
    let result = {};
    try {
        JSON.parse(str);
        result = JSON.parse(str);
    } catch (e) {
        if (cat === "title")
          result = ""
        else if (cat === "name")
          result = []
    }
    return result;
}

  const likedPlaceName = isJsonString(props.match.params.likedPlaceName, "name");
  const getTitle  = isJsonString(props.match.params.title, "title");

  const [title, setTitle] = React.useState(getTitle);
  const [reorderList, updateList] = useState("");

  useEffect(() => {
    (async() => {      
      // url 에서 빼내온 장소를 통해 그것을 화면 하단에 출력함 
      let result = await getPlaceByName(likedPlaceName);
      if (result){
        dispatch(setFavListByUri(result));
        updateList(result);
      } 
      })()
  }, [Object.keys(likedPlaceName).length]);

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

  const linkCopied = () => {
    const nowPageLink = "http://localhost:3000"+props.location.pathname;
    window.dataLayer.push({event: 'clickShareBtn', selectedElement: props.location.pathname});
    navigator.clipboard.writeText(nowPageLink);
    clickShareButton(userInstantId, props.location.pathname);
    dispatch(onOpenFlash({title: '링크가 복사됨', body:  <div style={{"fontSize":"70%"}}>링크 복사 완료!<LinkOutlined/></div> }));
    setTimeout(() => {
        dispatch(onCloseFlash());
    }, 1300);
  }

  const Right = () => {
    return (
      <div style={styles.topLeftWrapper}>
        <ShareAltOutlined style={styles.shareButton} onClick={linkCopied}/>
      </div>
    )
  }

  const ClickLeft = () => {
  }

  const addLike = (place) => {
    dispatch(addFavPlace(place));
    dispatch(addFavPlaceByUri(place));
    addUserFavPlace(userInstantId, place);
    window.dataLayer.push({event: 'addLikePlace', selectedElement: place.name}); // Google Analytics
    dispatch(onOpenFlash({ title: '좋아요 클릭', body: "찜 완료! ❤" }));
    setTimeout(() => {
        dispatch(onCloseFlash());
    }, 3000);
  }

  const removeLike = (place) => {
      dispatch(delFavPlace(place));
      dispatch(delFavPlaceByUri(place));
      window.dataLayer.push({event: 'disLikePlace', selectedElement: place.name}); // Google Analytics
      delUserFavPlace(userInstantId, place);
      dispatch(onOpenFlash({ title: '좋아요 해제', body: "찜 해제 😿" }));
      let delIdx = reorderList.findIndex(eachPlace => eachPlace === place);
      let temp = reorderList[delIdx];
      reorderList[delIdx] = reorderList[Object.keys(reorderList).length - 1]
      reorderList[Object.keys(reorderList).length - 1] = temp
      delete reorderList[Object.keys(reorderList).length - 1];
      setTimeout(() => {
        dispatch(onCloseFlash());
      }, 3000);
      let updatedPlace = []
      Object.values(reorderList).map(
        (place)=>
          {if (place) 
            updatedPlace.push(place.name)
          });
      props.history.push('/like/place/name/' + JSON.stringify(updatedPlace) + '/"' + favePlaceTitle + '"');
 
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
  const onChangeTitle = (value) => {
    setTitle(value);
    dispatch(setFavPlaceTitle(value));
    props.history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace))+ '/"' + favePlaceTitle + '"');
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(reorderList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setFavListByUri(items));
    updateList(items)
    let updatedPlace = []
    if(Object.values(items) && Object.values(items).length ){
      for (let i of  Object.values(items)) {
        if (i){
          updatedPlace.push(i.name);
        }
      }
      props.history.push('/like/place/name/' + JSON.stringify(updatedPlace)+ '/"' + favePlaceTitle + '"');
    }
  };

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Header Center={Center} Left={Left} Right={Right} ClickLeft={ClickLeft} />
        {Object.values(reorderList)
            ?
            <>
            <div style={styles.overFlowHidden}>
                <div style={styles.countLike}>
                  <div style={styles.fontBold}>
                    <InlineInput style={styles.marginRight} onInput={onChangeTitle} placeholder={title} />
                    <MoreHorizIcon style={styles.marginLeft}/>
                  </div>
                      {
                      Object.keys(favPlace).length?
                        <div style={styles.likeSum}> 총 {Object.keys(favPlace).length} 개</div>
                      :<></> 
                    }
                  </div>
               
              </div>
              <RecMap places={reorderList} />
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId={"testId"}>
                  {provided => (
                  <List style={styles.list} 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                  >
                    {Object.values(reorderList)?.map((placeName, idx) => (
                        <>
                        {!placeName?
                          <></>:
                          <div>
                          <Draggable 
                              key={placeName?.name + idx} 
                              draggableId={placeName?.name + idx} 
                              index={idx}
                          >
                            {(provided) => (
                              <ListItem 
                                  alignItems="flex-start" 
                                  divider="true" 
                                  color="white"
                                  button="true" 
                                  ref={provided.innerRef} 
                                  {...provided.draggableProps} 
                                  {...provided.dragHandleProps}
                              >
                                <ListItemText
                                    primary={
                                      <div style={styles.setbgColor}>
                                          <Link to={{
                                            pathname: '/pl/detail/' + placeName?.name,
                                            state: {place: placeName},
                                          }}>
                                              <div style={{letterSpacing : "1.9px"}}> 
                                                {placeName.name}
                                              </div>
                                          </Link>
                                      </div>
                                  }
                                  secondary={
                                    <React.Fragment>
                                        <Link to={{
                                            pathname: '/pl/detail/' + placeName?.name,
                                            state: {place: placeName},
                                          }}>
                                          <Typography
                                              component="span"
                                              variant="body2"
                                              color="textPrimary">
                                              <p style={styles.placeOneline}>
                                                  "{placeName.oneline}"
                                              </p>
                                              <p style={styles.setbgColor}>
                                                {placeName.address}
                                              </p>
                                              <div style={styles.tags}>
                                                  {tagsList(placeName.menu, "menu")}
                                                  {tagsList(placeName.mood, "mood")}
                                                  {tagsList(placeName.media, "media")}
                                                  {tagsList(placeName.theme, "theme")}
                                                  {tagsList(placeName.companion, "companion")}
                                                  {tagsList(placeName.gender, "gender")}
                                                  {tagsList(placeName.age_group, "age_group")}
                                                  {tagsList(placeName.location, "location")}
                                                  {tagsList(placeName.category, "category")}
                                                  
                                              </div>
                                          </Typography>
                                        </Link>
                                    </React.Fragment>
                                  } />
                                    <div style={styles.container}>
                                      {favPlace[placeName.name]
                                              ?
                                              (
                                              <div style={styles.LikedWrapper}>
                                                  <HeartFilled style={styles.isLiked} onClick={()=> removeLike(placeName)}/>
                                              </div>
                                                )
                                              : 
                                              (
                                              <div style={styles.LikedWrapper}>
                                                  <HeartTwoTone style={styles.isLiked}  onClick={()=> addLike(placeName)} twoToneColor="#eb2f96"/>
                                              </div>
                                                  )
                                        }
                                        <Link to={{
                                          pathname: '/pl/detail/' + placeName?.name,
                                          state: {place: placeName},
                                        }}>
                                          <img
                                            style={listImgStyles(placeName.img)}
                                            alt="준비중.."
                                            src={placeName.img}
                                          />
                                        </Link>
                                    </div>
                              </ListItem>
                            )}
                          </Draggable>
                          
                          </div>
                          }

                      </>
                    ))}
                    {provided.placeholder}
                  </List>  
                )} 
                </Droppable>
              </DragDropContext>         
            </>  
            :
            <div 
              style={styles.marginTop}>
            <Result
              icon={<QuestionOutlined />}
              title="좋아하는 장소가 없어요."
              subTitle="여행 취향을 입력하고 어울리는 장소를 보아요!"
              ></Result>            
            </div>        
            }
            <BottomNav 
              clickFilter={clickFilter}
              FilterIcon={FilterIcon}
              clickList={clickList}
              ListIcon={ListIcon}
            />
    </ThemeProvider>
    </>
  )
}

export default Likes