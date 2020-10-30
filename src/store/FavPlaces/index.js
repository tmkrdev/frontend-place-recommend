//초기 value 정의
let favPlaces = window.localStorage.getItem('favPlaces')
const initialState = {
    data: favPlaces ? JSON.parse(favPlaces) : {},
    title : "좋아하는 장소"
};

//액션 타입 
const GET_FAV_LIST = "FAV_PLACES/GET_FAV_LIST";
const ADD_FAV_PLACE = "FAV_PLACES/ADD_FAV_PLACE";
const DEL_FAV_PLACE = "FAV_PLACES/DEL_FAV_PLACE";
const SET_FAV_PLACE_TITLE = "FAV_PLACES/SET_FAV_PLACE_TITLE";



// 액션 생성 함수
export const getFavList = place => async dispatch => {
    dispatch({
        type: GET_FAV_LIST,
        place
    })
};

// 액션 생성 함수
export const addFavPlace = place => async dispatch => {
    dispatch({
        type: ADD_FAV_PLACE,
        place
    })
};

// 액션 생성 함수
export const delFavPlace = place => async dispatch => {
    dispatch({
        type: DEL_FAV_PLACE,
        place
    })
};

// 액션 생성 함수
export const setFavPlaceTitle = title => async dispatch => {
    dispatch({
        type: SET_FAV_PLACE_TITLE,
        title
    })
};

const FavPlaces = (state = initialState, action) => {
    let cloneData = {...state.data}
    switch (action.type) {

        case SET_FAV_PLACE_TITLE:
        
            return {
                ...state,
                title: action.title
            }
            
        case GET_FAV_LIST:
            return {
                ...state
            }
        case ADD_FAV_PLACE:
            cloneData[action.place.name] = action.place
            window.localStorage.setItem('favPlaces', JSON.stringify(cloneData))
            return {
                ...state,
                data: cloneData
            }
        case DEL_FAV_PLACE:
            delete cloneData[action.place.name]
            
            window.localStorage.setItem('favPlaces', JSON.stringify(cloneData))
            return {
                ...state,
                data: cloneData
            }
        default:
            return state;
    }
};

export default FavPlaces;
