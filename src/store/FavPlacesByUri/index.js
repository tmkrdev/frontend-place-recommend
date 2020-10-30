//초기 value 정의
const initialState = {
    data: {}
};

//액션 타입 
const SET_FAV_LIST_BY_URI = "FAV_PLACES_BY_URI/SET_FAV_LIST_BY_URI";
const ADD_FAV_PLACE_BY_URI = "FAV_PLACES/ADD_FAV_PLACE_BY_URI";
const DEL_FAV_PLACE_BY_URI = "FAV_PLACES/DEL_FAV_PLACE_BY_URI";

// 액션 생성 함수
export const setFavListByUri = place => async dispatch => {
    dispatch({
        type: SET_FAV_LIST_BY_URI,
        data : place
    })
};
// 액션 생성 함수
export const addFavPlaceByUri = place => async dispatch => {
    dispatch({
        type: ADD_FAV_PLACE_BY_URI,
        place
    })
};

// 액션 생성 함수
export const delFavPlaceByUri = place => async dispatch => {
    dispatch({
        type: DEL_FAV_PLACE_BY_URI,
        place
    })
};

const FavPlacesByUri = (state = initialState, action) => {
    let cloneData = {...state.data}
    switch (action.type) {
        case SET_FAV_LIST_BY_URI:
            return {
                ...state,
                data : action.data
            }
        case ADD_FAV_PLACE_BY_URI:
            if(!Object.values(cloneData).includes(action.place)){
                cloneData[Object.keys(cloneData).length] = action.place;
            }
            return {
                ...state,
                data: cloneData
            }
        case DEL_FAV_PLACE_BY_URI:

            for (let i in cloneData){
                if (cloneData[i].name === action.place.name){
                    let temp = cloneData[i]
                    cloneData[i] = cloneData[Object.keys(cloneData).length - 1]
                    cloneData[Object.keys(cloneData).length - 1] = temp
                    delete cloneData[Object.keys(cloneData).length - 1];
                }
            }
            return {
                ...state,
                data: cloneData
            }
  
        default:
            return state;
    }
};

export default FavPlacesByUri;
