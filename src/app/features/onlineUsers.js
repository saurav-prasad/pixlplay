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
        }
    }
})

export const { setOnlineUsers, removeOnlineUser } = onlineUsersSlice.actions
export default onlineUsersSlice.reducer