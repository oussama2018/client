import {configureStore} from "@reduxjs/toolkit" 
import  useReducer  from "./slices/userSlice"
import adminReducer from "./slices/adminSlice"
import { combineReducers } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use local storage as the storage engine

import userReducer from "./slices/userSlice";


// Create a combined reducer
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

// Configure persist options
const persistConfig = {
  key: 'root', // Key to store the data in local storage
  storage, // Storage engine to use (local storage)
  whitelist: ['user'], // List of reducers to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persisted store
const persistor = persistStore(store);

export { store, persistor };



export default configureStore({reducer:{user:useReducer,admin:adminReducer}})
