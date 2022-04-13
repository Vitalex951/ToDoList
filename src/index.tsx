import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./Components/state/state";

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
