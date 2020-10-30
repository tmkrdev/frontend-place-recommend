import React from "react";
import ReactDOM from "react-dom";
import './styles/index.css';
import 'antd/dist/antd.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
////아래 것들이 전부 없어야 함
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/rootReducer";
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
// import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "redux-devtools-extension";
import logger from 'redux-logger';

const customHistory = createBrowserHistory();

// const sagaMiddleware = createSagaMiddleware({
//   context: {
//     history: customHistory
//   }
// });

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
        ReduxThunk.withExtraArgument(
        {history: customHistory}), 
        logger
      )
    )
  )
// sagaMiddleware.run(rootSaga);   // 루트 사가 실행 

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </Provider>
    </React.StrictMode>, document.getElementById("root"));

serviceWorker.unregister();
