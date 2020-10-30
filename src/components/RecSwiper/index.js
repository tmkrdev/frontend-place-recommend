/*global kakao*/
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import SwipeableViews from 'react-swipeable-views';
import NextButton from '../util/Swiper/NextButton';
import PrevButton from '../util/Swiper/PrevButton';
import Pagination from '../util/Pagination';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Route, Link} from "react-router-dom";

const {kakao} = window;
const styles = {
    slide: {
        padding: 20,
        minHeight: 500,
        color: '#fff'
    },
    plDetail: {
        "borderRadius" : "23px",
        width: '70%',
        color: '#FFEFD5',
        boxShadow: '1px 2px #6C7993',
        fontWeight: 'bold',
        bottom : "10"
    }
};

export const RecSwiper = (props) => {

    const { plIndex, handleChangePlIndex } = props;

    const {
        resPlList = [],
        userSelCard = {}
    } = useSelector((s) => ({
        resPlList: s.RecResultList.data, 
        userSelCard: s.selectedCards
    })); 

    const {map, overlay, marker} = useSelector(state => 
        ({  map: state.RecMap.map, 
            overlay: state.RecMap.overlay, 
            marker: state.RecMap.marker}), []);

    let coords = '';

    useEffect( () => {
        
        if (resPlList){
            let lat = parseFloat(resPlList[plIndex]['lat']),
                lng = parseFloat(resPlList[plIndex]['lng']);
            if (isNaN(lat) || isNaN(lng)) { // 검색이 안 되었으면
                console.error(
                    '[장소 이름] :', resPlList[plIndex]['name'], '의 \
                    \n위치 : ', resPlList[plIndex]['address'], '가 검색 되지 않아요.\
                    \n올바른 위치를 다시 설정 해주세요.'
                    )
            }
            coords = new kakao.maps.LatLng(lat, lng);
            if (map && overlay[plIndex] && !(isNaN(lat) || isNaN(lng))) {
                overlay.map((eachOvl) => {
                    if (eachOvl.length !== 0) {
                        eachOvl.setMap(null); // 전부 닫아줌 ..
                    }
                });
                overlay[plIndex].setMap(map);
                map.setCenter(coords);
            }
        }
        else {
            return <div id="recSwiper">...</div>
        }

    }, [plIndex]);

    if (!resPlList) {
        return <div id="recSwiper">...</div> 
    }

    const resPlListLen = resPlList.length,
          cards = [];

    resPlList.map((item, index) => 
        cards.push(
            <div className="resultCard"
                key={item + index}
                style={Object.assign({}, styles.slide)}>
                <h2>{item.name}</h2>
                <p>{item.location}</p>
                <p>{item.address}</p>

                <Link to={{
                    pathname: '/pl/detail'+item.name,
                    plIndex : plIndex
                }}>

                    <Button variant="outlined" style={styles.plDetail}>
                        더 알 아 보 기&nbsp;·
                    </Button>

                </Link>
                <div className="cardHashtagGroup">
                    {Object
                        .keys(userSelCard).map((index) => 
                            userSelCard[index].map((val) => {
                                return (
                                    <div className="cardHashtagItem" key={val}>
                                        <div> #{val}</div>
                                    </div>
                                )
                            }))
                    }
                </div>
            </div>
        )
    )

    return ( 
            <> 
                <div id="recSwiper">
                    <PrevButton index={plIndex} onChangeIndex={handleChangePlIndex}/>
                    <NextButton
                        checkEnds={resPlListLen}
                        index={plIndex}
                        onChangeIndex={handleChangePlIndex}/>

                    <SwipeableViews
                        enableMouseEvents
                        index={plIndex}
                        onChangeIndex={handleChangePlIndex}>
                        {cards}
                    </SwipeableViews>
                    <Pagination
                        dots={resPlListLen}
                        index={plIndex}
                        onChangeIndex={handleChangePlIndex}/>

                </div> 
            </>
    )

}
export default RecSwiper;