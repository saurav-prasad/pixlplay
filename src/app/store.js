import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth'
import canvasReducer from './features/canvases'
import allCanvasesReducer from './features/allCanvases'
const store = configureStore({
    reducer: {
        authReducer,
        canvasReducer,
        allCanvasesReducer
    }
})
export default store