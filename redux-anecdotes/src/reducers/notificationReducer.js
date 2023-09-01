import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificatioSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            state = action.payload
            return state
        },
        removeNotification(state) {
            return state === null
        } 
    }
})

export const { displayNotification, removeNotification } = notificatioSlice.actions

export const setNotifiactions = (anecdoteUpdated, time) => {
    return async dispatch => {
        dispatch(displayNotification(anecdoteUpdated))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time)
    }
}

export default notificatioSlice.reducer