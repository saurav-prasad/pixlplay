import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const onlineUsersSlice = createSlice({
    name: "online users",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            return { ...action.payload }
        },
        removeOnlineUser: (state, action) => {
            delete state[action.payload]
        },
        removeAllOnlineUser: (state, action) => {
            return {}
        }
    }
})

export const { setOnlineUsers, removeOnlineUser, removeAllOnlineUser } = onlineUsersSlice.actions
export default onlineUsersSlice.reducer