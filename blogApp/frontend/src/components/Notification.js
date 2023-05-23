const Notification = ({ msg, isError }) => {
  if (!msg) {
    return
  }

  return (
    <div className={isError? "error" : "success"}>
      {msg}
    </div>
  )
}

export default Notification