import { createSlice } from "@reduxjs/toolkit"

const initialState = { text: "", show: false, type: "alert" }

const alertSlice = createSlice({
    initialState,
    name: 'alert',
    reducers: {
        setAlert: (state, action) => {
            return { show: true, type: action.payload.type || "alert", text: action.payload.text }
        },
        unsetAlert: (state, action) => {
            return { text: "", show: false, type: "alert" }
        },
    }
})

export const { setAlert, unsetAlert } = alertSlice.actions
export default alertSlice.reducer