import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const allCanvasesSlice = createSlice({
    initialState,
    name: 'all canvases',
    reducers: {
        setAllCanvases: (state, action) => {
            return [...action.payload]
        },
        addInAllCanvases: (state, action) => {
            return [...state, { ...action.payload }]
        },
        deleteInAllCanvases: (state, action) => {
            const newState = state.filter(canvas => canvas.id !== action.payload)
            return newState
        },
        updateInAllCanvases: (state, action) => {
            return { ...state, [action.payload.id]: action.payload.canvas }
        },
    }
})

export const { setAllCanvases, addInAllCanvases, deleteInAllCanvases, updateInAllCanvases } = allCanvasesSlice.actions
export default allCanvasesSlice.reducer