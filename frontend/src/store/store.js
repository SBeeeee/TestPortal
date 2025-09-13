import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/slice';
import studentReducer from './students/slice';
import testReducer from './test/slice';


export const store=configureStore({
    reducer:{
        student: studentReducer,
        test:testReducer,
       user: userReducer,
    }
})

export default store;