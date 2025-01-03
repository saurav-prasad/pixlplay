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
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer