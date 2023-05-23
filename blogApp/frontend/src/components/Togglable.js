import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(visible => !visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  }, [])

  const hideWhenVisible = { display: visible? "none" : "" }
  const showWhenVisible = { display: visible? "" : "none" }
  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.proptypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"

export default Togglable
