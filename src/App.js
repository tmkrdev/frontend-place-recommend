import React from "react";
import logo from "./logo.svg";

import ApiRstFlash from './components/common/apiRstFlash'
import {
    Redirect
  } from "react-router-dom";

//라우터
import Signup from "./containers/Signup";
import Signin from "./containers/Signin";
import ChooseField from "./containers/ChooseField";
import PlDetailContainer from "./containers/PlDetail"
import {Route, Switch} from 'react-router-dom';
import RecResultListContainer from "./containers/RecResultList";
import  Likes from "./containers/Likes";
import  PlacesByTheme from "./containers/PlacesByTheme";
import  Company from "./containers/Company";


function App() {
    return (
        <div className="App">
            <Route exact path="/">
                <Redirect to="/enter/preference" />
            </Route>
            <Route exact path="/step1">
                <Redirect to="/enter/preference" />
            </Route>
                <Route path="/signup" exact={true} component={Signup}/>
                <Route path="/signin" exact={true} component={Signin}/>
                <Route path="/enter/preference" exact={true} component={ChooseField}/>
                {/* <Route path="/place/entities" exact={true} component={PlaceEntities}/> */}
                <Route path="/reco/result/:userSelectedCards" component={RecResultListContainer}/>
                <Route path="/pl/detail/:placeName" component={PlDetailContainer}/>
                <Route path="/like/place/name/:likedPlaceName/:title" exact={true} component={Likes}/>
                <Route path="/like/place/name/:likedPlaceName" exact={true} component={ChooseField}/>
                <Route exact path="/like/place/name/">
                    <Redirect to='/reco/result/%7B"gender":["남자","여자"]%7D' />
                </Route>
                <Route exact path="/reco/result/">
                    <Redirect to='/reco/result/%7B"gender":["남자","여자"]%7D'/>
                </Route>
                <Route path="/place/theme/:themeSentence" exact={true} component={PlacesByTheme}/>
                <Route path="/company" exact={true} component={Company}/>
                {/* <Route component={ChooseField} exact /> */}
            <ApiRstFlash />
        </div>
    );
}
export default App;