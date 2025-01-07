import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth'
import canvasesReducer from './features/canvases'
import allCanvasesReducer from './features/allCanvases'
import alertReducer from "./features/alert"

const store = configureStore({
    reducer: {
        authReducer,
        canvasesReducer,
        allCanvasesReducer,
        alertReducer
    }
})
export default store