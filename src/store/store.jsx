import { configureStore, TaskAbortError } from "@reduxjs/toolkit";
import authReducer,{loginSuccess} from "../features/authSlice";


const store = configureStore({
    reducer:{
        auth:authReducer
    }
})

if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    if (token) {
      // Dispatch login success action if token exists
      store.dispatch(loginSuccess({ user: {}, token }));
    }
  }
  
  export default store;