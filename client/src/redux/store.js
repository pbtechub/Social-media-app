import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth/authSlice'
import userReducer from './slices/users/usersSlice'
import friendReducer from './slices/friends/friendsSlice'
import postReducer from './slices/posts/postsSlices'
import commentReducer from './slices/comments/commentSlice'
import { apiSlice } from "./slices/apiSlice";



export const store = configureStore({
    reducer: { 
        auth: authReducer,
        users: userReducer,
        posts: postReducer,
        comments: commentReducer,
        friends: friendReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
