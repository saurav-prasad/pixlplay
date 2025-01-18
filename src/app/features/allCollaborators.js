import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const allCollaboratorsSlice = createSlice({
    initialState,
    name: 'invite Noti',
    reducers: {
        setAllCollab: (state, action) => {
            return {
                ...state,
                [action.payload.canvasId]: action.payload.collaborators
            }
        },
        removeCollab: (state, action) => {
            const newCollabs = state[action.payload.canvasId].filter((data) => data.userId !== action.payload.userId)
            return { ...state, [action.payload.canvasId]: newCollabs }
        },
        removeAllCollab: (state, action) => {
            delete state[action.payload]
        }
    }
})

export const { setAllCollab, removeCollab, removeAllCollab } = allCollaboratorsSlice.actions
export default allCollaboratorsSlice.reducer