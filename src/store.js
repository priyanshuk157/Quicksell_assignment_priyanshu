import {configureStore} from '@reduxjs/toolkit';
import { DataReducer, SelectDataReducer } from './Others/Reducer';

const store = configureStore({
    reducer : {
        DataReducer, SelectDataReducer
    }
})

export default store;