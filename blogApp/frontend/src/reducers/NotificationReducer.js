import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
  isError: false,
}

const notificationReducer = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    clearNotification: () => {
      return initialState
    },
  },
})

export const { setNotification, clearNotification } =
  notificationReducer.actions
export default notificationReducer.reducer

export const notify = (message, isError) => {
  return (dispatch) => {
    // TODO: could use a timoutId to clear previous timer?
    dispatch(setNotification({ message, isError }))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }
}
