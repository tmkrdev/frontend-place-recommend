// // import axios from "axios";
// import * as placeAPI from '../../api/places';

// //초기 value 정의
// const initialState = {
//     data: []
// };

// //액션 타입 
// const GET_PLACE_ENTITY_LIST = "PLACE_ENTITY_LIST/GET_PLACE_ENTITY_LIST";
// const INIT_PLACE_ENTITY_LIST = "PLACE_ENTITY_LIST/INIT_PLACE_ENTITY_LIST";

// // 액션 생성 함수
// export const callPlaceEntityList = response => async dispatch => {
//     dispatch({
//         type: GET_PLACE_ENTITY_LIST,
//         data: response
//     })
// };

// export const initPlaceEntityList = () => (dispatch, getState)  => {
//     dispatch({
//         type: INIT_PLACE_ENTITY_LIST
//     })
// };


// const PlaceEntityList = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_PLACE_ENTITY_LIST:
//         return {
//             ...state,
//             data: action.data[0]
//         }

//         case INIT_PLACE_ENTITY_LIST:
//             return {
//                 ...state,
//                 data : []
//             }
//         default:
//             return state;
//     }
// };

// export default PlaceEntityList;
