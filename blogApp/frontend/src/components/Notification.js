import { useSelector } from "react-redux"

import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const isError = useSelector((state) => state.notification.isError)
  if (!message) {
    return
  }

  return (
    <Alert
      severity={isError ? "error" : "success"}
      sx={{
        my: 1,
      }}
    >
      <AlertTitle>{isError ? "Error" : "Success"}</AlertTitle>
      {message}
    </Alert>
  )
}

export default Notification
