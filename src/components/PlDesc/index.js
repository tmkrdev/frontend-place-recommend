import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tag } from 'antd';
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';
import { onOpenFlash, onCloseFlash } from '../../store/base'
import { addFavPlace, delFavPlace } from '../../store/FavPlaces'
import { addUserFavPlace, delUserFavPlace } from '../../api/mongodb';
import { getPlaceByName } from '../../api/places';
import { callPlaceDesc } from '../../store/PlDetail';
import { getNaverPlaceId } from '../../api/places'
import LoadingScreen from 'react-loading-screen';
import { v4 as uuidv4 } from 'uuid';
import { saveUserId } from "../../api/mongodb";
import { saveUserInstantId } from "../../store/UserInfo";

const styles = {
    desc: {
        "letterSpacing": "1.3px",
        'paddingRight': '30px',
        'fontSize': '14px',
        'fontWeight': "bold",
        "float": "right"
    },
    topWrap: {
        display:"flex",
        justifyContent: "space-between", 
        marginLeft : 20,
        marginTop : 20,
        marginRight : 50,
        marginBottom : 0,
        "letterSpacing": "1.3px",
    },
    wannaGo : {
        "fontSize": '37px',
        float: "right",
        "color" : "#eb2f96"
    },
    placeOneline :{
        color:"#000000a6", 
        marginLeft : 20,
        marginBottom : 20,
        fontSize: "150%",
        transform: "skewX(-5deg)"
    },
    tagWrapper : {
        // paddingBottom: "45px",
        display:"flex",
        "flexWrap": "wrap",
        // justifyContent: "space-evenly"
    },
    tagStyle : { 
        "display": "flex", 
        float: "bottom",
        "flexWrap": "wrap",
        fontSize: "12px", 
        margin: "3px", 
        borderRadius : "10px" 
    }
};

const checkTagColor = (value) => {

    let tagColor = {
        location: "geekblue",
        category: "green",
        age_group: "cyan",
        mood: "volcano",
        gender: "purple",
        menu: "blue",
        media:"red", 
        theme : "black",
        companion: "orange"
    };

    return tagColor[value] || 'geekblue';

}

const tagsList = (value, kind) => {

    let result = [];
    let tagColor = checkTagColor(kind);
    if (value){
    value.replace(" ", "").split(",").map((val, idx) => {
        if(val && val !== '-') { 
        result.push(
            <Tag color={tagColor}
                style={styles.tagStyle}
                key={kind+val+idx}>#{val}
            </Tag>)
        }

    })
    }

    return result;
}
const PlDesc = (props) => {
    let placeName = [props.placeName]; 
    let [ placeId, setPlaceId ] = useState(0)
    let dispatch = useDispatch();

    const {
        plDesc = {},
        favPlace = {}
    } = useSelector((s) => ({
        plDesc: s.PlDetail.data,
        favPlace: s.FavPlaces.data
    }));

    let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 
    const genUserInsId = 'guest_'.concat(uuidv4());
    let getUserId = async (userId)=> saveUserId(userId); // 생성된 user_id 를 mongodb 에 저장

    useEffect(() => {
        (async () => {
            let result = await getPlaceByName(placeName);
            if (result.length){
                dispatch(callPlaceDesc(result));
                let { lat, lng, name } = result[0];
                let placeNaverId = await getNaverPlaceId({ lat, lng, name });
                if (placeNaverId) {
                    setPlaceId(placeNaverId.data)
                }
                else {
                    setPlaceId('') // 결과 없을 경우, 없음 페이지라도 나타나게 '' 값을 반환한다
                }
                window.dataLayer.push({event: 'seePlaceDetail', selectedElement: name});

            }
            if(!result.length){
                props.history.push('/');
            }
            if (!userInstantId){
                dispatch(saveUserInstantId(genUserInsId));
            }

        })()
    }, []);

    if (userInstantId){
        getUserId(userInstantId);  /// 어차피 몽고디비에서 user_id 가 있으면, 저장을 하지 않음 
    }

    if (!plDesc.length){
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
    const addLike = () => {

        dispatch(addFavPlace(plDesc[0]));
        addUserFavPlace(userInstantId, plDesc[0]);
        window.dataLayer.push({event: 'addLikePlace', selectedElement: plDesc[0]['name']}); // Google Analytics
        dispatch(onOpenFlash({ title: '좋아요 클릭', body: "찜 완료! ❤" }));
        setTimeout(() => {
            dispatch(onCloseFlash());
        }, 3000);
    }

    const removeLike = () => {
        dispatch(delFavPlace(plDesc[0]));
        delUserFavPlace(userInstantId, plDesc[0]);
        window.dataLayer.push({event: 'disLikePlace', selectedElement: plDesc[0]['name']}); // Google Analytics
        dispatch(onOpenFlash({ title: '좋아요 해제', body: "찜 해제 😿" }));
        setTimeout(() => {
            dispatch(onCloseFlash());
        }, 3000);
    }

    

    return (
        <div style={{ paddingTop: "45px" }}>
            <div style={styles.topWrap}>
                <h1 style={styles.title}>{plDesc[0].name}</h1>
                {favPlace[plDesc[0].name]
                    ?( 
                        <div>
                        <HeartFilled style={styles.wannaGo} onClick={removeLike} twoToneColor="#eb2f96" />
                        </div>
                    )
                    : (
                        <div>
                        <HeartTwoTone style={styles.wannaGo} onClick={addLike} twoToneColor="#eb2f96" />
                        </div>
                        )}
            </div>

            <div style={styles.placeOneline}>
                "{plDesc[0].oneline}"
            </div>
            <div style={styles.tagWrapper}>
                {tagsList(plDesc[0].mood, "mood")}
                {tagsList(plDesc[0].gender, "gender")}
                {tagsList(plDesc[0].age_group, "age_group")}
                {tagsList(plDesc[0].category, "category")}
                {tagsList(plDesc[0].location, "location")}
                {tagsList(plDesc[0].menu, "menu")}
                {tagsList(plDesc[0].theme, "theme")}
                {tagsList(plDesc[0].companion, "companion")}
                {tagsList(plDesc[0].media, "media")}

            </div>
            <div style={{ width: "100%", height: window.innerHeight - 170 }}>
                {placeId ? (
                    <iframe 
                        id="naver"
                        style={{ width: "100%", height: "100%" }}
                        src={`https://pcmap.place.naver.com/place/${placeId}?&&from=map`}
                        // src={`https://m.place.naver.com/place/list?query=${place.name}&start=1&display=30&adult=true&spq=false&highlight=true&sessionId=71EmlDjkq3FMbMkK8ETf8A%3D%3D&level=top&entry=ple`}
                        // src={`https://map.naver.com/v5/search/%EA%B2%BD%EB%B3%B5%EA%B6%81/place/${getId(place.lat, place.lng, place.name)}`}
                    />
                ): (
                    <
                        iframe 
                        id="naver"
                        style={{ width: "100%", height: "100%" }}
                        src={`https://m.place.naver.com/place/list?query=${plDesc[0].name}&start=1&display=30&adult=true&spq=false&highlight=true&sessionId=71EmlDjkq3FMbMkK8ETf8A%3D%3D&level=top&entry=ple`}
                        // src={`https://map.naver.com/v5/search/%EA%B2%BD%EB%B3%B5%EA%B6%81/place/${getId(place.lat, place.lng, place.name)}`}
                    />
                )}
            </div>

        </div>

    )

};
export default PlDesc;