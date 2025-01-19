import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth'
import canvasesReducer from './features/canvases'
import allCanvasesReducer from './features/allCanvases'
import alertReducer from "./features/alert"
import onlineUsersReducer from "./features/onlineUsers"
import inviteNotiReducer from './features/inviteNoti'
import allCollaboratorsReducer from "./features/allCollaborators"
import canvasAdminReducer from "./features/canvasAdmin"

const store = configureStore({
    reducer: {
        authReducer,
        canvasesReducer,
        allCanvasesReducer,
        alertReducer,
        onlineUsersReducer,
        inviteNotiReducer,
        allCollaboratorsReducer,
        canvasAdminReducer
    }
})
export default store