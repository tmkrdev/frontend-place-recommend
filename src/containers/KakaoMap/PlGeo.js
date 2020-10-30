/*global kakao*/
import {useDispatch, useSelector} from "react-redux";
import {addMarkerAndOvl} from "../../store/RecMap"

const PlGeo = (places) => {
    // handleChangePlIndex 는 현재 안 쓰고 있음 
    // handleChangePlIndex = 0;

    const {
        resPlList = []
    } = useSelector((s) => ({resPlList: s.RecResultList.data}));

    const {
      } = useSelector((s) => ({
        favPlace: s.FavPlaces.data
      }));



    const dispatch = useDispatch();
    let KakaoMap = [];
    let custOvl = [];
    let checkAllFilled = 0;

    const {map} = useSelector(state => ({map: state.RecMap.map}), []);
    // const geocoder = new kakao
    //     .maps
    //     .services
    //     .Geocoder();

    const closeOvl = () => {
        for (var idx in custOvl) {
            custOvl[idx].setMap(null);
        }
    }

    KakaoMap = map;
    const plGeo = (setLoading) => {

        let lenResult = Object.keys(places).length;

        var bounds = new kakao.maps.LatLngBounds();  

        if(Object.values(places) && Object.values(places).length && places && places.length){
        Object.values(places).forEach((item, idx) => {

            if(item){
            let placeName = item.name,
                lat = parseFloat(item.lat),
                lng = parseFloat(item.lng)

            if (isNaN(lat) || isNaN(lng)) { //  검색이 안된 것 임으로
                dispatch(addMarkerAndOvl([], [], idx, lenResult, placeName));
                return
            }

           

            var coords = new kakao.maps.LatLng(lat, lng);
            var marker = new kakao.maps.Marker({map: map, position: coords, clickable: true});



            marker.setMap(KakaoMap);

            bounds.extend(coords);
        
            var content = document.createElement('div');
            content.innerHTML = ' <div class="customoverlay">' +
                                '    <span class="ovlTitle">'+item.name +'</span>' +
                                '</div>';

            let closeBtnStyle = {
                    display: "absolute",
                    float: "right"                },
                closeBtn = document.createElement('i');

            closeBtn.className = 'fa fa-times close';
            Object.assign(closeBtn.style, closeBtnStyle);

            closeBtn.title = '닫기';

            closeBtn.onclick = function () {
                window["overlay" + idx].setMap(null);
            };

            content.querySelector('.ovlTitle').appendChild(closeBtn);

            window["overlay" + idx] = new kakao.maps
                .CustomOverlay({ // 커스텀 오버레이 생성
                    map: null,
                    position: coords,
                    content: content,
                    yAnchor: 1
                });

            custOvl.push(window["overlay" + idx]);

            dispatch(addMarkerAndOvl(marker, window["overlay" + idx], idx, lenResult, placeName));

            kakao.maps.event.addListener(marker, 'click', function () {
                    closeOvl();
                    window["overlay" + idx].setMap(KakaoMap);
                    // handleChangePlIndex(idx);
                });


            if (checkAllFilled === resPlList.length - 1) {
                setTimeout(setLoading(false), 10000);
            }
            else {
                checkAllFilled += 1;
            }
        }})}

        if (KakaoMap) {
                KakaoMap.setBounds(bounds);
        }

        

    }

    return {plGeo};
};

export default PlGeo;
