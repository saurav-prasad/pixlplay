import { createSlice } from "@reduxjs/toolkit"

const initialState = { user: null }

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        login: (state, action) => {
            return { user: action.payload }
        },
        logout: (state, action) => {
            return { user: null }
        },
        updateProfile: (state, action) => {
            return { user: action.payload }
        }
    }
})

export const { login, logout ,updateProfile} = authSlice.actions
export default authSlice.reducer