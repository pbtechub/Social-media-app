import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postsApiSlice";


const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}



export const createPost = createAsyncThunk('posts/createPost', async (postData, thunkAPI) =>  {
    try {
        // const token = thunkAPI.getState().auth.user.token
        return await postService.createPost(postData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})
export const getPosts = createAsyncThunk('posts/getPosts', async (userId, thunkAPI) =>  {
    try {
        // const token = thunkAPI.getState().auth.user.token
        return await postService.getPosts(userId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (deleteData, thunkAPI) =>  {
    try {
        // const token = thunkAPI.getState().auth.user.token
        return await postService.deletePost(deleteData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

export const likePost = createAsyncThunk('users/likePost', async ( likeData, thunkAPI) =>  {
    try {
        console.log(likeData);
        // const token = thunkAPI.getState().auth.user.token
        return await postService.likePost(likeData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


export const commentPost = createAsyncThunk('users/commentPost', async ( commentData, thunkAPI) =>  {
    try {
        console.log(commentData);
        // const token = thunkAPI.getState().auth.user.token
        return await postService.commentPost(commentData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter((post)=> post._id !== action.payload.id) 
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            .addCase(likePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users.push(action.payload)
            })
            .addCase(likePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            .addCase(commentPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users.push(action.payload)
            })
            .addCase(commentPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })

       
   
    }
})

export const { posts, reset} = postSlice.actions;
export default postSlice.reducer;