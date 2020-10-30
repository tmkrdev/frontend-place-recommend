import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { saveUserCards } from "../../api/mongodb";

const RecButton = ({history}) => {

    let [ isShow, setIsShow ] = useState(false)
    let { selectedCards={} } = useSelector(s => ({
        selectedCards: s.selectedCards
    }))
    let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 
    let getAgeGroup = useSelector((state) => state.selectedCards.age_group); 
    let getGender = useSelector((state) => state.selectedCards.gender); 

    // let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 

    // const dispatch = useDispatch();

    let styles = {
        fontWeight : '580',
        textShadow : '0px 0px 3px #FDF5E6',
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0,
        backgroundColor : "#5f9be0",
        color : "white",
        transitionProperty: "bottom",
        transitionDuration: "0.4s",
        // opacity: isShow? 1: 0,
        bottom: isShow? "0" : "-54px"
    }
    
    useEffect(() => { 
        if ( Object.keys(selectedCards).length ) {
            setIsShow(true)
        } else {
            setIsShow(false)
        }
    }, [Object.keys(selectedCards)])  

    const clickHandle = () => {
        history.push('/reco/result/' +   JSON.stringify(selectedCards));
        if(getAgeGroup){
            saveUserCards(userInstantId, "age_group", ...getAgeGroup);
        }
        if(getGender){
            saveUserCards(userInstantId, "gender", ...getGender);
        }
        window.dataLayer.push({event: 'recommendButton', selectedElement: '추천 받기'});

        // 나이와 성별이 저장되어 있다면, 보내기 
    }

    return (
        <div id="bottom">
            <Button 
                
                variant="contained"  
                style={styles}
                onClick={clickHandle}
            >
                추 천 받 기 🍀
            </Button>
        </div>
    );
}
export default RecButton;
