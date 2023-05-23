import { configureStore } from "@reduxjs/toolkit"
import NotificationReducer from "./reducers/NotificationReducer"
import BlogReducer from "./reducers/BlogReducer"
import UserReducer from "./reducers/UserReducer"

const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    blogs: BlogReducer,
    user: UserReducer,
  },
})

export default store
