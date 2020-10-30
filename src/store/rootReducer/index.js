import {combineReducers} from "redux";
import relation from "../Relation";
import selectedCards from "../SelectedCards";
import RecMap from "../RecMap";
import PlDetail from "../PlDetail";
// import PlaceEntityList from "../PlaceEntityList";
import FavPlaces from '../FavPlaces';
import FavPlacesByUri from '../FavPlacesByUri';
import PlacesByTheme from '../PlacesByTheme';

import UserInfo from '../UserInfo'


import Base from "../base";
import RecResultList from "../RecResultList"

const rootReducer = combineReducers({
    relation, selectedCards, RecResultList, RecMap, Base, PlDetail, FavPlaces, FavPlacesByUri , PlacesByTheme,  UserInfo, 
});
// export function* rootSaga() {
//     yield all([ResultSaga()]);
// }

export default rootReducer;
