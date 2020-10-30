//// 지도 백업 ////
// /*global kakao*/
// import React from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {addMarkerAndOvl} from "../../store/RecMap"

// const PlGeo = (handleChangePlIndex) => {
//     handleChangePlIndex = 0;

//     const {
//         resPlList = []
//     } = useSelector((s) => ({resPlList: s.RecResultList.data}));

//     const {
//         favPlace = []
//       } = useSelector((s) => ({
//         favPlace: s.FavPlaces.data
//       }));



//     const dispatch = useDispatch();
//     let KakaoMap = [];
//     let custOvl = [];
//     let checkAllFilled = 0;

//     const {map} = useSelector(state => ({map: state.RecMap.map}), []);
//     const geocoder = new kakao
//         .maps
//         .services
//         .Geocoder();

//     const closeOvl = () => {
//         for (var idx in custOvl) {
//             custOvl[idx].setMap(null);
//         }
//     }

//     KakaoMap = map;
//     const plGeo = (setLoading) => {

//         let lenResult = Object.keys(favPlace).length;
//         console.log(lenResult, '여기 뭐야 ??');
//         console.log(favPlace,'여기 혹시 나오니 ??');

//         let fstPlCoords = {};
//         Object.values(favPlace).forEach((item, idx) => {
//             // console.log(Object.keys(favPlace)[idx], '여기 뭔지 알려주서 ');
//             // console.log(Object.values(favPlace)[idx], '여기 뭔지 알려주서 ');
//             let placeName = item.name,
//                 lat = parseFloat(item.lat),
//                 lng = parseFloat(item.lng)

//             if (isNaN(lat) || isNaN(lng)) { //  검색이 안된 것 임으로
//                 dispatch(addMarkerAndOvl([], [], idx, lenResult, placeName));
//                 return
//             }

//             if (idx == 0 && !isNaN(lat) && !isNaN(lng)) {
//                 fstPlCoords = new kakao.maps.LatLng(lat, lng);
//             }

//             var coords = new kakao.maps.LatLng(lat, lng);
//             var marker = new kakao.maps.Marker({map: map, position: coords, clickable: true});

//             marker.setMap(KakaoMap);
        
//             var content = document.createElement('div');
//             content.innerHTML = ' <div class="customoverlay">' +
//                                 '    <span class="ovlTitle">'+item.name +'</span>' +
//                                 '</div>';

//             let closeBtnStyle = {
//                     display: "absolute",
//                     float: "right"                },
//                 closeBtn = document.createElement('i');

//             closeBtn.className = 'fa fa-times close';
//             Object.assign(closeBtn.style, closeBtnStyle);

//             closeBtn.title = '닫기';

//             closeBtn.onclick = function () {
//                 window["overlay" + idx].setMap(null);
//             };

//             content.querySelector('.ovlTitle').appendChild(closeBtn);

//             window["overlay" + idx] = new kakao.maps
//                 .CustomOverlay({ // 커스텀 오버레이 생성
//                     map: null,
//                     position: coords,
//                     content: content,
//                     yAnchor: 1
//                 });

//             custOvl.push(window["overlay" + idx]);

//             dispatch(addMarkerAndOvl(marker, window["overlay" + idx], idx, lenResult, placeName));

//             kakao.maps.event.addListener(marker, 'click', function () {
//                     closeOvl();
//                     window["overlay" + idx].setMap(KakaoMap);
//                     // handleChangePlIndex(idx);
//                 });

//             if (KakaoMap) {
//                 if (idx == 0 && !isNaN(lat) && !isNaN(lng)) {
//                     KakaoMap.setCenter(fstPlCoords);
//                     window["overlay" + 0].setMap(KakaoMap);
//                 }
//             }
//             if (checkAllFilled == resPlList.length - 1) {
//                 setTimeout(setLoading(false), 10000);
//             }
//             else {
//                 checkAllFilled += 1;
//             }
//         })

//     }

//     return {plGeo};
// };

// export default PlGeo;
