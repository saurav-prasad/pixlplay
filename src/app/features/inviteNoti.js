import { createSlice } from "@reduxjs/toolkit"

const initialState = { show: false, username: null, canvasId: null, adminUserId: null, adminProfilePhoto: null,canvasName:null }

const inviteNotiSlice = createSlice({
    initialState,
    name: 'invite Noti',
    reducers: {
        setInviteNoi: (state, action) => {
            return {
                show: true,
                username: action.payload.username,
                canvasId: action.payload.canvasId,
                adminUserId: action.payload.adminUserId,
                adminProfilePhoto: action.payload.adminProfilePhoto,
                canvasName:action.payload.canvasName
            }
        },
        unsetInviteNoi: (state, action) => {
            return { show: false, username: null, canvasId: null, adminUserId: null, adminProfilePhoto: null,canvasName:null }
        },
    }
})

export const { setInviteNoi, unsetInviteNoi } = inviteNotiSlice.actions
export default inviteNotiSlice.reducer