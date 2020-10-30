// 댓글 크롤러 보류 
// // import React, { useState } from 'react';
// import React, {useEffect, useState} from "react";
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
// import {getComments} from "../../api/places";
// import InfiniteScroll from 'react-infinite-scroll-component';

// const InfiniteList = (props) => {
//     const theme = window.localStorage.getItem('theme');
//     const styles = {
//         reviewTitle: {
//             fontSize: '19px',
//             fontWeight: 'bold',
//             height: '50%',
//             marginTop: '37px',
//             'padding': '10px',
//             'textShadow': theme === 'dark'
//                 ? '2px 2px 0px #696969, 6px 4px 0px rgba(0,0,0,0.15)'
//                 : '2px 2px 0px #F5F5F5, 5px 4px 0px #FFEFD5'
//         },
//         inline: {
//             'display': 'inline'

//         }
//     }

//     const [comments,setComments] = useState({data: [], page: 0, cntOfPage: 6}); // 한 화면에 데이터 6개만 보여지게 함 ..

//     let name = props.name;

//     const fetchMoreData = async() => {
//         const {data, page, cntOfPage} = comments;
//         setComments({
//             data: comments
//                 .data
//                 .concat(await getComments(name, page, cntOfPage)),
//             page: page + 1,
//             cntOfPage: cntOfPage
//         });
//     };

//     return (
//         <div>
//             <div style={styles.reviewTitle}>사용자 리뷰</div>
//             <InfiniteScroll
//                 dataLength={comments.data.length}
//                 next={fetchMoreData}
//                 hasMore={true}
//                 >
//                 <List>
//                     {comments.data.map((val, index) => (
//                         <>
//                         <ListItem alignItems="flex-start">
//                             <ListItemAvatar>
//                                 <Avatar alt={val.author} src="/static/images/avatar/1.jpg"/>
//                             </ListItemAvatar>
//                             <ListItemText
//                                 primary={val.author}
//                                 secondary={
//                                 <React.Fragment>
//                                 <Typography
//                                     component="span"
//                                     variant="body2"
//                                     className={styles.inline}
//                                     color="textPrimary">
//                                     {val.content}
//                                 </Typography>
//                                 </React.Fragment>
//                                 }/>
//                         </ListItem>
//                         <Divider variant = "inset" component = "li" key = {val}/>
//                         </>
//                         ))}
//                 </List>
//             </InfiniteScroll>
//         </div>
//     );
        

// }

// export default InfiniteList;