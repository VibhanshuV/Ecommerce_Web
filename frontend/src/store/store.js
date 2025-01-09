import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';

//here we combine all our reducers
const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default store;