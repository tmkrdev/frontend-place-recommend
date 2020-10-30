import React, { useEffect } from "react";
import { Tag } from 'antd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Route, Link } from "react-router-dom";
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';
import { onOpenFlash, onCloseFlash } from '../../store/base';
import { saveUserPlaceResult } from "../../api/mongodb";
import { addFavPlace, delFavPlace } from '../../store/FavPlaces';
import { addUserFavPlace, delUserFavPlace } from '../../api/mongodb';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

const styles = {
    tags: {
        "display": "flex", 
        float: "bottom",
        fontSize: 'small',
        "flexWrap": "wrap",
    },
    LikedWrapper : {
        "position": "absolute",
        "top": "8px",
        "right": "14px"
    },
    isLiked : {
        "color" : "#eb2f96",
        "fontSize": '30px',
        "textAlign" : "left", 
    },
    textWithTip :{
        color:"#000000a6", 
        fontSize: "116%",
        transform: "skewX(-5deg)",
    },
    themeTextWithTip :{
        color:"#000000a6", 
        fontSize: "136%",
        transform: "skewX(-5deg)",
        fontWeight : "590"
    },
    textBold :{
        color:"#000000a6", 
        fontWeight :"bold"
    },
    themeBox: {
        "height": "50px",
        left :"0",
        backgroundColor:"#f0f5ff",
        "display": "flex", 
        "alignItems" : "center",
        "justifyContent":"center",
        "border": "0.5px solid rgba(0, 0, 0, 0.15)",
        "borderRadius" : "5px",
    },
    container : {
        "position": "relative",
        "text-align": "center",
        "color": "white"
    }
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

const checkTagColor = (value) => {
    let tagColor = {
        location: "geekblue",
        category: "green",
        age_group: "cyan",
        theme: "black",
        mood: "volcano",
        gender: "purple",
        menu : "red"
    };

    return tagColor[value] || 'geekblue';
}



export const RecList = (props) => {

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
    
    let search_query = isJsonString(props.search_query) || {};

    const {
        relation = {},
        resPlList = [],
        favPlace = {}
    } = useSelector((s) => ({
        resPlList: s.RecResultList.data,
        favPlace: s.FavPlaces.data,
        relation : s.relation,
    }));  // 결과 value 가져오고 


    let savePlaceResult = async (user_id, resPlList)=> saveUserPlaceResult(user_id,resPlList); 

    let dispatch = useDispatch();

    let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 
    useEffect(() => {
        (async() => {
            savePlaceResult(userInstantId, resPlList);
        })()

    }, [resPlList]);

    const addLike = (place) => {
        dispatch(addFavPlace(place));
        addUserFavPlace(userInstantId, place);
        window.dataLayer.push({event: 'addLikePlace', selectedElement: place.name}); // Google Analytics
        dispatch(onOpenFlash({ title: '좋아요 클릭', body: "찜 완료! ❤" }));

        setTimeout(() => {
            dispatch(onCloseFlash());
        }, 3000);

    }

    const removeLike = (place) => {
        dispatch(delFavPlace(place));
        window.dataLayer.push({event: 'disLikePlace', selectedElement: place.name}); // Google Analytics
        delUserFavPlace(userInstantId, place);
        dispatch(onOpenFlash({ title: '좋아요 해제', body: "찜 해제 😿" }));
        setTimeout(() => {
            dispatch(onCloseFlash());
        }, 3000);

    }

    const themeSlide = () => {
        let result = []
        const clickTheme =(val) => {
            search_query["theme"] = [val];
            props.history.push("/reco/result/" + JSON.stringify(search_query));
        }

        for ( let val of relation["theme"]){
            result.push(
                <SwiperSlide onClick={()=>clickTheme(val)}>
                    <div style={styles.themeBox} >
                        <div style={styles.themeTextWithTip}>{val}</div>
                    </div>
                </SwiperSlide>
            )
        }
        return result
    }
    
    const tagsList = (value, kind) => {
        let isValue = [];
        let tagColor = checkTagColor(kind);
      
        value && kind !== "theme"?
            value.replace(" ", "").split(",").map((val, index) => {
                if(search_query[kind] && search_query[kind].includes(val)){
                isValue.push(
                    <Tag 
                        color={tagColor}
                        style={{ float: "right", fontSize: "12px", margin: "3px", borderRadius : "10px" }}
                        key={val+index}>#{val}
                    </Tag>
                )
                }
            }) 
            :value && kind === "theme"?
            value.split(",").map((val) => {
                if(search_query[kind] && search_query[kind].includes(val)){
                isValue.push(
                    <Tag 
                        color={tagColor}
                        style={{ float: "right", fontSize: "12px", margin: "3px", borderRadius : "10px" }}
                        key={val}>#{val}
                    </Tag>
                )
                }
            }):
            isValue.push('')
        return isValue;
    }

    return (
        <>
            <div>       
                <List>
                    {resPlList.map((place, index) => (
                        <>
                            <ListItem alignItems="flex-start" divider="true" button="true">
                                <ListItemText
                                    primary={
                                        <>
                                            <Link to={{
                                                pathname: '/pl/detail/' + place.name,
                                                state: { place: place }
                                            }}>
                                                <div style={{letterSpacing : "1.9px"}}> 
                                                    {place.name}
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
                                                        pathname: '/pl/detail/' + place.name,
                                                        state: { place: place }
                                                    }}>                                                    
                                                        <p style={styles.textWithTip}>
                                                            "{place.oneline}"
                                                        </p>
                                                    </Link>

                                                    <p>{place.address}</p>
                                                    <div style={styles.tags}>
                                                        {tagsList(place.menu, "menu")}
                                                        {tagsList(place.mood, "mood")}
                                                        {tagsList(place.media, "media")}
                                                        {tagsList(place.theme, "theme")}
                                                        {tagsList(place.companion, "companion")}
                                                        {tagsList(place.gender, "gender")}
                                                        {tagsList(place.age_group, "age_group")}
                                                        {tagsList(place.location, "location")}
                                                        {tagsList(place.category, "category")}
                                                        
                                                    </div>
                                                    
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                    <div style={styles.container}>
                                        {favPlace[place.name]
                                            ?
                                            (
                                            <div style={styles.LikedWrapper}>
                                                <HeartFilled style={styles.isLiked} onClick={()=> removeLike(place)} 
                                                                twoToneColor="#eb2f96"/>
                                            </div>
                                            )
                                            : 
                                            (
                                            <div style={styles.LikedWrapper}>
                                                <HeartTwoTone style={styles.isLiked} onClick={()=> addLike(place)}
                                                            twoToneColor="#eb2f96"/>
                                            </div>
                                                )
                                        }
                                        <Link to={{
                                        pathname: '/pl/detail/' + place.name,
                                        state: { place: place }
                                        }}>  
                                            <img
                                                style={listImgStyles(place.img)}
                                                alt="준비중.."
                                                src={place.img}
                                            />
                                        </Link>
                                    </div>
                                </ListItem>
                                {index === 1? 
                                 <ListItem divider="true" button="true">
                                     <ListItemText
                                        primary={
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary">
                                                <h3 style={styles.textBold}>테마별 장소</h3>
                                            </Typography>
                                        }
                                            secondary={
                                                
                                                <Swiper
                                                    style={{zIndex : 0}}
                                                    spaceBetween={10}
                                                    slidesPerView={3.1}
                                            >
                                                {themeSlide()}
                                            </Swiper>

                                            }
                                    />
                                </ListItem>
                                
                                : <></>
                               }
                        </>
                    ))}
                </List>
            </div>
        </>
    )

}
export default RecList;