import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducer from './reducers'
import { configureStore } from '@reduxjs/toolkit'

const store=createStore(reducer,applyMiddleware(thunk));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

    <Provider store={store}>
    <App />
    </Provider>

);

export type AppDispatch = typeof store.dispatch
