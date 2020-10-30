const initialState = {
    flash: {
        isOpen: false,
        title: '',
        body: ''
    }
};

const OPEN_FLASH = "BASE/OPEN_FLASH";
const CLOSE_FLASH = "BASE/CLOSE_FLASH";

export const onOpenFlash = ({title, body}) => (dispatch, getState) => {
    dispatch({type: OPEN_FLASH, title, body});
};
export const onCloseFlash = () => (dispatch, getState) => {
    dispatch({type: CLOSE_FLASH});
};

const Base = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_FLASH:
            return {
                ...state,
                flash: {
                    isOpen: true,
                    title: action.title,
                    body: action.body
                }
            };
        case CLOSE_FLASH:
            return {
                ...state,
                flash: {
                    isOpen: false,
                    title: '',
                    body: ''
                }
            }
        default:
            return state;
    }
};

export default Base;