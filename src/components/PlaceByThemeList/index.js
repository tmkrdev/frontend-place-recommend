import React , { useEffect } from "react";
import { Tag } from 'antd';
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Route,Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { addFavPlace, delFavPlace } from '../../store/FavPlaces';
import { addFavPlaceByUri, delFavPlaceByUri } from '../../store/FavPlacesByUri';
import { addUserFavPlace, delUserFavPlace } from '../../api/mongodb';
import {saveUserId } from "../../api/mongodb";
import { v4 as uuidv4 } from 'uuid';
import { saveUserInstantId } from "../../store/UserInfo";
import { onOpenFlash, onCloseFlash } from '../../store/base';

const styles = {

    list : {
        position:"fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: "50%",
        "overflow" :"scroll",
    },
    LikedWrapper : {
        "position": "absolute",
        "top": "8px",
        "right": "14px"
    },
    isLiked : {
        "fontSize": '30px',
        "textAlign" : "left", 
        "color":"#eb2f96"
    },
    placeOneline :{
      color:"#000000a6", 
      fontSize: "116%",
      transform: "skewX(-5deg)",
    },
    container : {
      "position": "relative",
      "text-align": "center",
      "color": "white"
    }
}

const checkTagColor = (value) => {
    let tagColor = {
        location: "geekblue",
        category: "green",
        age_group: "cyan",
        mood: "volcano",
        gender: "purple",
        menu: "red",
    };
    
    return tagColor[value] || 'geekblue';
  }
  
  const tagsList = (value, kind) => {
    let result = [];
    let tagColor = checkTagColor(kind);
    if (value){
    value.replace(" ", "").split(",").map((val, index) => {
        if(val && val !== '-') { 
        // tag 는 각 카테고리별 하나만 push 하기 
        result.push(
            <Tag color={tagColor}
                style={{ float: "right", fontSize: "12px", margin: "3px", borderRadius : "10px" }}
                key={val+index}>#{val}</Tag>)
        }
    })
    }
  
    return result;
  }

  

const listImgStyles = (image) => ({
    height: '120px',
    width: '120px',
    lineHeight: '160px',
    borderRadius: 5,
    marginRight: 15,
    textAlign: 'center',
    backgroundImage: 'url(' + image + ')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    "boxShadow": "1px 2px 3px #808080"
});



export const PlaceByThemeList = (props) => {

    const places = props.places;
    
    let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 
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

    const {
        favPlace = {}
    } = useSelector((s) => ({
        favPlace: s.FavPlaces.data
    }));  // 결과 value 가져오고 


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
          setTimeout(() => {
              dispatch(onCloseFlash());
          }, 3000);
      }


    return (
        <>
            <div style={{marginTop: "90px"}}>       
    
            <List style={styles.list}>

            {Object.values(places).map((placeName, idx) => (
                    <>
                    <ListItem alignItems="flex-start" divider="true" button="true">

                      <ListItemText
                        primary={
                          <>
                          <Link to={{
                                pathname: '/pl/detail/' + placeName.name,
                                state: {place: placeName},
                            }}>
                                <div style={{letterSpacing : "1.9px"}}> 
                                    {placeName.name}
                                </div>
                           </Link>
                          </>
                      }
                      secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary">
                                <Link to={{
                                    pathname: '/pl/detail/' + placeName.name,
                                    state: { place: placeName }
                                }}>
                                    <p style={styles.placeOneline}>
                                        "{placeName.oneline}"
                                    </p>
                                </Link>
                                <p>{placeName.address}</p>
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
                            <img
                                style={listImgStyles(placeName.img)}
                                alt="준비중.."
                                src={placeName.img}
                            />
                          </div>
                    </ListItem>
                  </>
                ))}
                </List>
            </div>
        </>
    )

}
export default PlaceByThemeList;