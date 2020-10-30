const initialState = {
    map: null,
    marker: [],
    overlay: []
};

const SET_MAP = "REC_MAP/SET_MAP";
const ADD_MARKER_AND_OVL = "REC_MAP/ADD_MARKER_AND_OVL";
const INIT_MARKER_AND_OVL = "REC_MAP/INIT_MARKER_AND_OVL";

export const setMap = (map) => (dispatch, getState) => {
    dispatch({type: SET_MAP, map: map});
};

export const addMarkerAndOvl = (marker, overlay, placeIndex, lenResult, placeName) => (dispatch, getState) => {
    dispatch({
        type: ADD_MARKER_AND_OVL,
        marker: marker,
        overlay: overlay,
        placeIndex: placeIndex,
        lenResult: lenResult,
        placeName: placeName
    });
};

export const initMarkerAndOvl = () => (dispatch, getState) => {
    dispatch({type: INIT_MARKER_AND_OVL});
};

const RecMap = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAP:
            return {
                ...state,
                map: action.map
            };

        case ADD_MARKER_AND_OVL:

            let insOvl = state.overlay || [];
            let insMarker = state.marker || [];

            insOvl[action.placeIndex] = action.overlay;
            insMarker[action.placeIndex] = action.marker;

            if (insOvl.length > action.lenResult && insMarker.length > action.lenResult) {

                let ovlLenDiff = insOvl.length - action.lenResult;
                let markerLenDiff = insMarker.length - action.lenResult;

                for ( let i = 0; i <ovlLenDiff; i++){
                    insOvl.pop();
                    insMarker.pop();
                }

                insOvl[action.placeIndex] = action.overlay;
                insMarker[action.placeIndex] = action.marker;

                if (ovlLenDiff !== markerLenDiff) {
                    console.error(" 마커 개수랑 info Wndw 개수가 달라요.");
                }
            }

            return {
                ...state,
                overlay: insOvl,
                marker: insMarker
            };

        case INIT_MARKER_AND_OVL:
            return {
                ...state, 
                marker  : [], 
                overlay :  []
            };

        default:
            return state;
    }
};

export default RecMap;