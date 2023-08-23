import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendService from "./friendsApiSlice";

const initialState = {
    followers: [],
    followings: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}



export const getAllFollowers = createAsyncThunk('friends/getAllFollowers', async (userId, thunkAPI) =>  {
    try {
        // const token = thunkAPI.getState().auth.user.token
        // console.log(userId);
        return await friendService.getAllFollowers(userId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


export const getAllFollowings = createAsyncThunk('friends/getAllFollowings', async (userId, thunkAPI) =>  {
    try {
        // const token = thunkAPI.getState().auth.user.token
        return await friendService.getAllFollowings(userId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})



const friendSlice = createSlice({
    name: 'friend',
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
            .addCase(getAllFollowers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllFollowers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.followers = action.payload
            })
            .addCase(getAllFollowers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            .addCase(getAllFollowings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllFollowings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.followings = action.payload
            })
            .addCase(getAllFollowings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
          
  
       
   
    }
})

export const { friends, reset} = friendSlice.actions;
export default friendSlice.reducer;