import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const canvasesSlice = createSlice({
    initialState,
    name: "canvases",
    reducers: {
        addCanvas: (state, action) => {
            state[action.payload.id] = [...action.payload.canvas];
        },
        deleteCanvas: (state, action) => {
            const { [action.payload]: _, ...rest } = state;
            return rest;
        },
        updateCanvas: (state, action) => {
            state[action.payload.id] = action.payload.canvas;
        },
        removeCanvas: (state) => {
            return {};
        },
    },
});

export const { addCanvas, deleteCanvas, updateCanvas, removeCanvas } = canvasesSlice.actions;
export default canvasesSlice.reducer;
