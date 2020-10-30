/*
  {
      location: ['용산구', '강동구', ...],
      companion: ['부모님', '애인', ...],
  }
  의 형태로 저장

  카드 해제할 땐 해제되는 대상을 리스트 마지막과 swap 한 후 pop으로 뺀다.
*/

const initialState = {};
const ADD_SELECTED_CARDS = "SELECTED_CARD/ADD_SELECTED_CARDS";
const DEL_SELECTED_CARDS = "SELECTED_CARD/DEL_SELECTED_CARDS";
const SET_SELECTED_CARDS = "SELECTED_CARD/SET_SELECTED_CARDS";
const SET_WHOLE_SELECTED_CARDS = "SELECTED_CARD/SET_WHOLE_SELECTED_CARDS";

const INITIALIZE_CARDS = "SELECTED_CARD/INITIALIZE_CARDS";

export const addSelectedCard = (
    relationName, value) => (dispatch, getState) => {
    dispatch({
        type: ADD_SELECTED_CARDS,
        relationName, value
    });
};

export const delSelectedCard = (
    relationName, value) => (dispatch, getState) => {
    dispatch({
        type: DEL_SELECTED_CARDS,
        relationName, value
    });
};

export const setSelectedCard = (
    relationName, value) => (dispatch, getState) => {
    dispatch({
        type: SET_SELECTED_CARDS,
        relationName, value
    });
};


export const setWhloeSelectedCard = (
    wholeValue) => (dispatch, getState) => {
    dispatch({
        type: SET_WHOLE_SELECTED_CARDS,
        wholeValue
    });
};

export const initializeCard = () => (dispatch, getState) => {
    dispatch({
        type: INITIALIZE_CARDS
    });
};

const selectedCards = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SELECTED_CARDS:
            
            let changed = state[action.relationName] || []
            changed.push(action.value)

            return {
                ...state, 
                [action.relationName]: changed
            }
        case DEL_SELECTED_CARDS:
            let origin = {...state}
            let clone = origin[action.relationName] 
            let idx = clone.indexOf(action.value)
            let temp = clone[idx]

            clone[idx] = clone[clone.length - 1]
            clone[clone.length - 1] = temp
            clone.pop()
            
            if (!clone.length) delete origin[action.relationName]

            return {
                ...origin
            }
        case SET_SELECTED_CARDS:
            return {
                ...state,
                [action.relationName] : action.value
            }
        case SET_WHOLE_SELECTED_CARDS:
            return action.wholeValue
        case INITIALIZE_CARDS:
            state = '';
            return state;
            
        default:
            return state;
    }
};

export default selectedCards;
