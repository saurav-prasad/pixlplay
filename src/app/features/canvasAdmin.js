import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const canvasAdminSlice = createSlice({
    initialState,
    name: "canvases",
    reducers: {
        setCanvasAdmin: (state, action) => {
            return [...action.payload]
        },
        clearCanvasAdmin: (state, action) => {
            return []
        }
    },
});

export const { setCanvasAdmin, clearCanvasAdmin } = canvasAdminSlice.actions;
export default canvasAdminSlice.reducer;
