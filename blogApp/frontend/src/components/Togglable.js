import { useState, forwardRef, useImperativeHandle, createContext } from "react"
import PropTypes from "prop-types"

import Button from "@mui/material/Button"

export const VisibilityContext = createContext()

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((visible) => !visible)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        toggleVisibility,
      }
    },
    []
  )

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }
  return (
    <div>
      <Button
        style={hideWhenVisible}
        variant="contained"
        color="success"
        onClick={toggleVisibility}
        fullWidth
      >
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        <VisibilityContext.Provider value={toggleVisibility}>
          {props.children}
        </VisibilityContext.Provider>
        <Button
          onClick={toggleVisibility}
          variant="contained"
          color="error"
          fullWidth
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.proptypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"

export default Togglable
