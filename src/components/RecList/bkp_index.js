// /*global kakao*/
// import React from "react";
// import { useEffect, useState, useRef} from "react";
// import { Divider, Tag } from 'antd';
// import { Modal, Button } from 'antd';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Typography from '@material-ui/core/Typography';
// import { BrowserRouter as Route, Link } from "react-router-dom";
// import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
// import { onOpenFlash, onCloseFlash } from '../../store/base';
// import { addFavPlace, delFavPlace } from '../../store/FavPlaces';
// import { addUserFavPlace, delUserFavPlace } from '../../api/mongodb';
// import { useSelector, useDispatch } from 'react-redux';


// const styles = {

//     dividerTitle: {
//         fontSize: 'large',
//         color : "#0b1016",
//         fontWeight: "bold",
//         marginBottom: "1px",
//     },
//     userPickTags: {
//         'background' : "#F8F8FF",
//         'marginTop': "36px",
//         "position" : "fixed",
//         "height": "5.2rem",
//         'marginBottom': "30px",
//         "overflow": "scroll",
//         "top" : 0,
//         "left": 0,
//         "right": 0,
//         "width": "100vw",
//         overflowX : "hidden",
//         "bottom":10,
//         "boxShadow" : "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
//         zIndex: 1
//     },

//     tags: {
//         float: "bottom",
//         fontSize: 'small',
//     },

//     sticky : {
//         'position' : 'fixed',
//         'top' : 0,
//         "width" : "100%"
//     },
    
//     stickyWrapper : {
//     "position" : "relative",
//     "height": "5rem",
//     "top" : 20,
//     'marginBottom': "30px"
//     },

//     topWrapper: {
//         "display": "flex", 
//         "alignItems" : "flex-start",
//         "flex-direction" : "column",
//         // "marginBottom" : "5%"
//     },
//     isLiked : {
//         "fontSize": '30px',
//         "textAlign" : "left", 
//         "marginLeft" : "85%"
//     }
// }


// const listImgStyles = (image) => ({
//     height: '120px',
//     width: '120px',
//     lineHeight: '160px',
//     borderRadius: 5,
//     marginRight: 15,
//     textAlign: 'center',
//     backgroundImage: 'url(' + image + ')',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     "boxShadow": "1px 2px 3px #808080"
// });

// const checkTagColor = (value) => {
//     let tagColor = {
//         location: "geekblue",
//         category: "green",
//         age_group: "cyan",
//         mood: "volcano",
//         gender: "purple",
//         menu : "red"
//     };

//     return tagColor[value] || 'geekblue';
// }

// const tagsList = (value, kind) => {
//     let isValue = [];
//     let tagColor = checkTagColor(kind);
  
//     value?
//         value.replace(" ", "").split(",").map((val) => {
//             isValue.push(
//                 <Tag 
//                     color={tagColor}
//                     style={{ float: "right", fontSize: "9px", margin: "3px" }}
//                     key={val}>#{val}
//                 </Tag>
//             )
    
//         }) :
//         isValue.push('')
//     return isValue;
// }

// export const RecList = ({search_query}) => {

//     search_query = JSON.parse(search_query) || {};

//     const [visible, setVisible] = useState(false);

//     const showModal = () => {
//         setVisible(true);
//     };

//     const handleOk = e => {
//         console.log(e);
//         setVisible(false);

//     };

//     const handleCancel = e => {
//         console.log(e);
//         setVisible(false);
//     };

//     // console.log(typeof search_query, "[ type of search_query ]");

//     const {
//         userSelCard = {},
//         resPlList = [],
//         favPlace = {}
//     } = useSelector((s) => ({
//         resPlList: s.RecResultList.data,
//         userSelCard: s.selectedCards,
//         favPlace: s.FavPlaces.data
//     }));  // 결과 value 가져오고 

//     let userInstantId = useSelector((state) => state.UserInfo.userInstantId); 

//     let dispatch = useDispatch();

//     const userSelTags = (kind) => {
//         const child = [];
//         let tagColor = checkTagColor(kind);
//         if ( kind == 'location' && search_query[kind].length > 13) {
//             child.push (
//                 <>
//                 <Tag ref={divRef} onClick={showModal} color={tagColor} key='ALL'>#위치 전부</Tag>
//                 <Modal
//                     title="Basic Modal"
//                     visible={visible}
//                     onOk={handleOk}
//                     onCancel={handleCancel}
//                 >
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//               </Modal>
//               </>
//             );
//         }
//         else {
//             search_query[kind].map((val) => {
//                 if(val != "ALL"){  // ALL 이라는 글자는 보여주지 않는다 
//                     child.push (<Tag ref={divRef} color={tagColor} key={val}>#{val}</Tag>);
//                 }
//             })
//         }
//         return child;
//     }

//     const divRef = useRef(null);

//     useEffect(() => {
//         divRef
//             .current
//             .scrollIntoView({block: "start", inline: "nearest"})
//     });

//     if (!resPlList) {
//         return <div>...</div>
//     }
//     const addLike = (place) => {
//         dispatch(addFavPlace(place));
//         addUserFavPlace(userInstantId, place);
//         window.dataLayer.push({event: 'addLikePlace', selectedElement: place.name}); // Google Analytics
//         dispatch(onOpenFlash({ title: '좋아요 클릭', body: "찜 완료! ❤" }));

//         setTimeout(() => {
//             dispatch(onCloseFlash());
//         }, 3000);

//     }

//     const removeLike = (place) => {
//         dispatch(delFavPlace(place));
//         window.dataLayer.push({event: 'disLikePlace', selectedElement: place.name}); // Google Analytics
//         console.log(' [ RecList  DelLike] ',userInstantId)
//         delUserFavPlace(userInstantId, place);
//         dispatch(onOpenFlash({ title: '좋아요 해제', body: "찜 해제 😿" }));
//         setTimeout(() => {
//             dispatch(onCloseFlash());
//         }, 3000);

//     }

//     return (
//         <>
//             <div>
//                 <div  style={styles.stickyWrapper}>
//                     <div style={styles.userPickTags}>
//                         <Divider orientation="left" style={styles.dividerTitle}>MY·PICK</Divider>
//                         {Object
//                             .keys(search_query)
//                             .map((kind) => {
//                                 return userSelTags(kind);
//                             })
//                         }
//                     </div>
//                 </div>
//                 <List>
//                     {resPlList.map((place, index) => (
//                         <>
//                             <ListItem alignItems="flex-start">
//                                 <Link to={{
//                                     pathname: '/pl/detail/' + place.name,
//                                     state: { place: place },
                                    
//                                 }}>
//                                     <img
//                                         style={listImgStyles(place.img)}
//                                         alt="준비중.."
//                                         src={place.img}
//                                     />
//                                 </Link>
//                                 <ListItemText
//                                     primary={
//                                         <>
//                                         <div styles={styles.topWrapper}>
//                                             <Link to={{
//                                                 pathname: '/pl/detail/' + place.name,
//                                                 state: { place: place }
//                                             }}>
//                                             {place.name}
//                                             </Link>
                                            
//                                                 {favPlace[place.name]
//                                                     ?
//                                                     (
//                                                     <div>
//                                                         <SmileTwoTone style={styles.isLiked} onClick={()=> removeLike(place)} 
//                                                                         twoToneColor="#eb2f96"/>
//                                                     </div>
//                                                      )
//                                                     : 
//                                                     (
//                                                     <div>
//                                                         <HeartTwoTone style={styles.isLiked} onClick={()=> addLike(place)}
//                                                                        twoToneColor="#eb2f96"/>
//                                                     </div>
//                                                         )
//                                                 }
//                                         </div>
//                                         </>
//                                     }
//                                     secondary={
//                                         <React.Fragment>
//                                             <Typography
//                                                 component="span"
//                                                 variant="body2"
//                                                 color="textPrimary">
//                                                 {place.address}<br/><br/>
//                                                 <div style={styles.tags}>
//                                                     {tagsList(place.mood, "mood")}
//                                                     {tagsList(place.gender, "gender")}
//                                                     {tagsList(place.age_group, "age_group")}
//                                                     {tagsList(place.category, "category")}
//                                                     {tagsList(place.location, "location")}
//                                                     {tagsList(place.menu, "menu")}

//                                                 </div>
//                                             </Typography>
//                                         </React.Fragment>
//                                     } />
//                             </ListItem>

//                             <Divider variant="inset" component="li" key={place.name} />
//                         </>
//                     ))}
//                 </List>
//             </div>
//         </>
//     )

// }
// export default RecList;