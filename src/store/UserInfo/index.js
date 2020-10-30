const initialState = {
    userInstantId : 0
};

const SAVE_INSTANT_ID = "USER_INFO/SAVE_ID";

export const saveUserInstantId = (id) => (dispatch, getState) => {
    dispatch({type: SAVE_INSTANT_ID, id});
};

const UserInfo = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_INSTANT_ID:
            // console.log('[SAVE_INSTANT_ID] :', action.id);
            return {
                ...state,
                userInstantId: action.id
            };
        default:
            return state;
    }
};

export default UserInfo;