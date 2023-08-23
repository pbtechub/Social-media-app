import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authApiSlice";


const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
// console.log(user.followers.includes(user._id));

const initialState = {
    user: user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register User

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) =>  {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// login 
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) =>  {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

// logout

export const logout = createAsyncThunk('auth/logout', async () =>  {
    await authService.logout()
})

 const authSlice = createSlice({
    name: 'auth',
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
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null
            })
    }


})

export const { reset} = authSlice.actions;

export default authSlice.reducer
