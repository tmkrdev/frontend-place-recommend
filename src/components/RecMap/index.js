import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import KakaoMap from "../KakaoMap";
import PlGeo from "../../containers/KakaoMap/PlGeo";

export const RecMap = (props) => {

    const { map } = useSelector(state => ({ map: state.RecMap.map }), []);
    const { places } = props;
    
    const { plGeo } = PlGeo(places);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        plGeo(setLoading);
    }, [map, Object.keys(places).length]);

    // if (loading) {
    //     return (
    //         // <KakaoMap/>
    //         // <LoadingScreen
    //         //     loading={true}
    //         //     bgColor='#F0F8FF'
    //         //     spinnerColor='#9ee5f8'
    //         //     textColor='#676767'
    //         //     logoSrc='/DAMOA.png'
    //         //     text='Please wait..'
    //         // > 
    //         // </LoadingScreen>

    //     )
    // } 
    return <KakaoMap/>

}
export default RecMap;
