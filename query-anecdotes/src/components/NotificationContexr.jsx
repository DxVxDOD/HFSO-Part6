import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch(action.type) {
      case "VOTE":
        return action.message
      case "NULL":
        return state === null
      case "ERROR":
        return action.message
      default: return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]} >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)
    return notification
}

export const useNotificationDispatch = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)
    return notificationDispatch 
}

export default NotificationContext