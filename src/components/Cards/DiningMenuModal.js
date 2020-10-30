// 모달 안 씀으로 주석 처리 
// import { Modal, Select } from 'antd';
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { addSelectedCard, delSelectedCard } from "../../store/SelectedCards";
// import axios from 'axios';
// import { setSelectedCard } from "../../store/SelectedCards";

// const {Option} = Select;

// const children = [];

// const DiningMenuModal = ({relName, value}) => {
//     const menu = useSelector((state) => state.relation['menu']); // relation 상태 가져옴
//     const dispatch = useDispatch();
//     const addCard = () => dispatch(addSelectedCard(relName, value));
//     const delCard = () => dispatch(delSelectedCard(relName, value));
//     const setMenu = (value) => dispatch(setSelectedCard("menu", value));

//     const [isOn,
//         setIsOn] = useState(false); // 초기에는 false

//     const checkIsOn = () => {
//         console.log(!isOn);
//         setIsOn(!isOn);
//         isOn
//             ? delCard()
//             : addCard();
//     };

//     useEffect(() => {
//         for (let i = 0; i < menu.length; i++) {
//             children.push(
//                 <Option key={menu[i]}>{menu[i]}</Option>
//             );
//         }
//     }, menu);

//     const style = {
//         fontWeight: "bold",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         listStyleType: "none",
//         width: "30%",
//         backgroundColor: "#87CEEB",
//         borderRadius: "23px",
//         height: "140px",
//         padding: "5px",
//         marginBottom: "15px",
//         opacity: isOn
//             ? "1"
//             : "0.5"
//     }

//     const [isModal,
//         setIsModal] = useState({visible: false}); // 초기에는 false

//     /* 모달 관련 함수 */
//     const onClick = () => {
//         checkIsOn();
//         showModal();
//     }

//     const showModal = () => {
//         setIsModal({visible: true});
//     };

//     const handleOk = e => {
//         console.log(e);
//         setIsModal({visible: false});
//     };

//     const handleCancel = e => {
//         console.log(e);
//         setIsModal({visible: false});
//         //취소 버튼 눌렀을 경우, "맛집" 혹은 "알코올" 카테고리 삭제 
//         setIsOn(false);
//         checkIsOn();
//         //취소 버튼 눌렀을 경우, "메뉴" 카테고리 삭제  
//         setMenu([]);
//         dispatch(delSelectedCard("menu", []));
//     };

//     /* select box  관련 함수 */
//     const handleChange = (value) => {
//         setMenu(value);
//     }

//     return ( 
//       <>
//         <li 
//             className="card blue"
//             style={style} 
//             onClick={onClick} 
//         >
//           {value}
//         </li>
//         <Modal title = "음식 메뉴" visible = {isModal.visible}
//                onOk = {handleOk}
//                onCancel = {handleCancel}
//         >
//         <Select mode="multiple"
//                 style={{width: '100%'}}
//                 placeholder="원하는 메뉴를 찾아보세요!" 
//                 // defaultValue={[]}}
//                 onChange={handleChange}>{children}</Select>
//         </Modal>
//       </>
//       );
// }

// export default DiningMenuModal;
