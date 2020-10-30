//초기 value 정의
const initialState = {
    data: {}
};

//액션 타입 
const GET_PLACE_DESC = "PLACE_DETAIL/GET_PLACE_DESC";
// const GET_PLACE_COMMENTS = "PLACE_DETAIL/GET_PLACE_COMMENTS";
// const INIT_PLACE_DESC_AND_COMMENTS = "PLACE_DETAIL/INIT_PLACE_DESC_AND_COMMENTS";

// 액션 생성 함수
export const callPlaceDesc = place => async dispatch => {
    dispatch({
        type: GET_PLACE_DESC,
        data: place
    })
};


const PlDetail = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLACE_DESC:
        return {
            ...state,
            data: action.data
        }
        default:
            return state;
    }
};

export default PlDetail;
