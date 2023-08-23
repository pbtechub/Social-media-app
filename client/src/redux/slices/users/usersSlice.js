import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./usersApiSlice";

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAllUsers = createAsyncThunk('users/getAllUsers', async ( thunkAPI) =>  {
    try {
        // const token = thunkAPI.getState().auth.user.token
        return await userService.getAllUsers()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

export const updateUser = createAsyncThunk('users/updateUser', async ( upData, thunkAPI) =>  {
    try {
        
        // const token = thunkAPI.getState().auth.user.token
        return await userService.updateUser(upData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

export const followUser = createAsyncThunk('users/followUser', async ( followData, thunkAPI) =>  {
    try {
        
        // const token = thunkAPI.getState().auth.user.token
        return await userService.followUser(followData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


const userSlice = createSlice({
    name: 'user',
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
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
            .addCase(followUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(followUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users.push(action.payload)
            })
            .addCase(followUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                
            })
  
       
   
    }
})

export const { users, reset} = userSlice.actions;
export default userSlice.reducer;