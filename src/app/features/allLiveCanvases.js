import { createSlice } from "@reduxjs/toolkit"

const initialState = { allLiveCanvases: [] }

const allLiveCanvasesSlice = createSlice({
    initialState,
    name: 'all live canvases',
    reducers: {
        setAllLiveCanvases: (state, action) => {
            return { allLiveCanvases: [...action.payload] }
        },
        deleteInAllLiveCanvases: (state, action) => {
            if (state.allCanvases.length === 1) {
                return { allLiveCanvases: null }
            }
            const newState = state.allLiveCanvases.filter(canvas => canvas.id !== action.payload)
            return { allLiveCanvases: [...newState] }
        },
        removeAllLiveCanvases: (state, action) => {
            return { allLiveCanvases: [] }
        }
    }
})

export const { setAllLiveCanvases, deleteInAllLiveCanvases, removeAllLiveCanvases } = allLiveCanvasesSlice.actions
export default allLiveCanvasesSlice.reducer