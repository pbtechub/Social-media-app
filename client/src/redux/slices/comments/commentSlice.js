import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentApiSlice";


const initialState = {
    comments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createComment = createAsyncThunk('comments/createComment', async (commentData, thunkAPI) =>  {
    try {
        // const token = thunkAPI.getState().auth.user.token
        return await commentService.createComment(commentData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})
export const getComments = createAsyncThunk('comments/getComments', async ( thunkAPI) =>  {
    try {
        // const token = thunkAPI.getState().auth.user.token
        return await commentService.getComments()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})
// export const deleteComment = createAsyncThunk('comments/deleteComment', async (deleteData, thunkAPI) =>  {
//     try {
//         // const token = thunkAPI.getState().auth.user.token
//         return await commentService.deleteComment(deleteData)
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) 
//         || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)

//     }
// })



const commentSlice = createSlice({
    name: 'comments',
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
            .addCase(createComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.comments.push(action.payload)
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            .addCase(getComments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.comments = action.payload
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            // .addCase(deleteComment.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(deleteComment.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.comments = state.comments.filter((comment)=> comment._id !== action.payload.id) 
            // })
            // .addCase(deleteComment.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
                
            // })


       
   
    }
})

export const { comment, reset} = commentSlice.actions;
export default commentSlice.reducer;