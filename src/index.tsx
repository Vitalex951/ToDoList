import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {AppWithRedux} from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./Components/store/store";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <AppWithRedux/>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
