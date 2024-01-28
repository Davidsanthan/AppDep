import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';

let initialStore ={
  loginDetails:{}
}
let loginReducer=(latestStore=initialStore,dispatchedObj)=>{
  console.log("inside LoginReducer");
  if (dispatchedObj.type == "login") {
    return{...latestStore,loginDetails:dispatchedObj.data};
  }
  return latestStore;
}
let taskReducer=(latestStore=initialStore,dispatchedObj)=>{
  console.log("inside TaskReducer");
  if (dispatchedObj.type == "login") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }else if (dispatchedObj.type=="submitTask") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }else if (dispatchedObj.type=="deleteTask") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }
  return latestStore;
}
let leaveReducer=(latestStore=initialStore,dispatchedObj)=>{
  console.log("inside LeaveReducer");
  if (dispatchedObj.type == "applyLeave") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }else if (dispatchedObj.type=="extendLeave") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }else if (dispatchedObj.type=="cancelLeave") {
    // return{...latestStore,loginDetails:dispatchedObj.data};
  }
  return latestStore;
}
let store=createStore(combineReducers({loginReducer,taskReducer,leaveReducer}),applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

    <App />
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
