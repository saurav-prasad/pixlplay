const { createSlice } = require("@reduxjs/toolkit")

const initialState = {}

const canvasesSlice = createSlice({
    initialState,
    name: 'canvases',
    reducers: {
        addCanvas: (state, action) => {
            const newCanvas = {
                [action.payload.id]: [...action.payload.canvas],
            }
            return { ...state, ...newCanvas }
        },
        deleteCanvas: (state, action) => {
            const { [action.payload]: _, ...rest } = state
            return rest
        },
        updateCanvas: (state, action) => {
            return { ...state, [action.payload.id]: action.payload.canvas }
        },

    }
})

export const { addCanvas, deleteCanvas, updateCanvas } = canvasesSlice.actions
export default canvasesSlice.reducer