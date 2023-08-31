import { createSlice } from "@reduxjs/toolkit";

const initialState = 'Initial notification'

const notificatioSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            return state
        }
    }
})

export const { displayNotification } = notificatioSlice.actions
export default notificatioSlice.reducer