// import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
// import Popup from "reactjs-popup";
// import Button from '@material-ui/core/Button';

// /* 사용자의 기본 정보 (연령 , 성별, 분야) 에 대해서 
//          필터링된 장소들의  entities 를 가져온다. */ 
// const ResEntitiesBtn = ({history}) => {

//     let [ isShow, setIsShow ] = useState(false)
//     let { selectedCards={} } = useSelector(s => ({
//         selectedCards: s.selectedCards
//     }))
//     let styles = {
//         fontWeight : '580',
//         textShadow : '0px 0px 3px #FDF5E6',
//         borderBottomLeftRadius: 0, 
//         borderBottomRightRadius: 0,
//         color : "#1890FF",
//         transitionProperty: "bottom",
//         transitionDuration: "0.4s",
//         // opacity: isShow? 1: 0,
//         bottom: isShow? "0" : "-54px"
//     }
    
//     useEffect(() => { 
//         if ( Object.keys(selectedCards).length ) {
//             setIsShow(true)
//         } else {
//             setIsShow(false)
//         }
//     }, [Object.keys(selectedCards)])  


//     const clickHandle = () => {
//         history.push('/place/entities')
//     }

//     return (
//         <div id="bottom">
//             <Button 
//                 variant="contained"  
//                 style={styles}
//                 onClick={clickHandle}
//             >
//                 다 음
//             </Button>
//         </div>
//     );
// }
// export default ResEntitiesBtn;
