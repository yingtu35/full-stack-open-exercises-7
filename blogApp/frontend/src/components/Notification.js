import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const isError = useSelector((state) => state.notification.isError)
  if (!message) {
    return
  }

  return <div className={isError ? "error" : "success"}>{message}</div>
}

export default Notification
