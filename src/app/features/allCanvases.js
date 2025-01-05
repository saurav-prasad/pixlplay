import { createSlice } from "@reduxjs/toolkit"

const initialState = { allCanvases: null }

const allCanvasesSlice = createSlice({
    initialState,
    name: 'all canvases',
    reducers: {
        setAllCanvases: (state, action) => {
            return { allCanvases: [...action.payload] }
        },
        addInAllCanvases: (state, action) => {
            if (state.allCanvases === null) {
                return { allCanvases: [{ ...action.payload }] }
            }
            const newState = [...state.allCanvases, { ...action.payload }]
            return { allCanvases: [...newState] }
        },
        deleteInAllCanvases: (state, action) => {
            if (state.allCanvases.length === 1) {
                return { allCanvases: null }
            }
            const newState = state.allCanvases.filter(canvas => canvas._id !== action.payload)
            return { allCanvases: [...newState] }
        },
        updateNameInAllCanvases: (state, action) => {
            const newState = state.allCanvases.map(canvas => {
                if (canvas._id === action.payload.id) {
                    return { ...canvas, name: action.payload.name }
                } else {
                    return canvas
                }
            })
            return { allCanvases: [...newState] }
        },
    }
})

export const { setAllCanvases, addInAllCanvases, deleteInAllCanvases, updateInAllCanvases, updateNameInAllCanvases } = allCanvasesSlice.actions
export default allCanvasesSlice.reducer