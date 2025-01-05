import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth'
import canvasesReducer from './features/canvases'
import allCanvasesReducer from './features/allCanvases'

const store = configureStore({
    reducer: {
        authReducer,
        canvasesReducer,
        allCanvasesReducer,
    }
})
export default store