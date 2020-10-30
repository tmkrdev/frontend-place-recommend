import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMap } from "../../store/RecMap"
const { kakao } = window;


const KakaoMap = () => {
  const dispatch = useDispatch();
  const mapStyle ={
      "position": "fixed",
      "left" : "0",
      "right": "0",
      "height" : "25.05%",
      "border-radius": "8px",
      "box-shadow": "1px 2px 3px #808080"
    }
  useEffect(() => {
    const container = document.getElementById('recMap');
    const options = {
        center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
        level: 5
    };

    const map = new kakao.maps.Map(container, options);
    dispatch(setMap(map), [map]);
  }, []);

  return <div id="recMap" style={mapStyle}></div>
}

export default KakaoMap;