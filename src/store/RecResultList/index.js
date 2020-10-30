// import axios from "axios";

//초기 value 정의
const initialState = {
    data: []
};

//액션 타입 
const GET_REC_RESULT_LIST = "REC_RESULT_LIST/GET_REC_RESULT_LIST";
const INIT_REC_RESULT_LIST = "REC_RESULT_LIST/INIT_REC_RESULT_LIST";

// 액션 생성 함수
export const callRecResultList = response => async dispatch => {
    dispatch({
        type: GET_REC_RESULT_LIST,
        data: response
    })
};

export const initRecResultList = () => (dispatch, getState)  => {
    dispatch({
        type: INIT_REC_RESULT_LIST
    })
};


const RecResultList = (state = initialState, action) => {
    switch (action.type) {
        case GET_REC_RESULT_LIST:
        
        return {
            ...state,
            data: action.data[0]
        }

        case INIT_REC_RESULT_LIST:
            return {
                ...state,
                data : []
            }
        default:
            return state;
    }
};

export default RecResultList;
