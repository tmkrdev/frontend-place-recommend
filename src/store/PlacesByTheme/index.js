//초기 value 정의
const initialState = {
    data: {}
};

//액션 타입 
const SET_PLACES_BY_THEME = "PLACES_BY_THEME/SET_PLACE_BY_THEME";


// 액션 생성 함수
export const setPlacesByTheme = place => async dispatch => {
    dispatch({
        type: SET_PLACES_BY_THEME,
        data : place
    })
};


const PlacesByTheme = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES_BY_THEME:
            return {
                ...state,

                data : action.data
            }
  
        default:
            return state;
    }
};

export default PlacesByTheme;
