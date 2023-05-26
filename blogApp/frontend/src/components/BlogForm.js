import { useState, useContext } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/BlogReducer"
import { notify } from "../reducers/NotificationReducer"

import { VisibilityContext } from "./Togglable"

// import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const BlogForm = () => {
  const toggleVisibility = useContext(VisibilityContext)
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    const isAdded = dispatch(createBlog(newBlog))
    if (isAdded) {
      const message = `a new blog ${newBlog.title} by ${newBlog.author} added`
      dispatch(notify(message, false))
      // TODO: how to toggle blogform visibility
      setTitle("")
      setAuthor("")
      setUrl("")
      toggleVisibility()
    }
  }

  return (
    <Box>
      <Typography component="h1" variant="h5">
        Create a new blog
      </Typography>
      <Box component="form" onSubmit={addBlog} className="login-form">
        <TextField
          autoComplete="title"
          autoFocus
          required
          fullWidth
          value={title}
          label="title"
          type="text"
          id="title"
          margin="dense"
          size="small"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          autoComplete="author"
          autoFocus
          required
          fullWidth
          value={author}
          label="author"
          type="text"
          id="author"
          margin="dense"
          size="small"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          autoComplete="url"
          autoFocus
          required
          fullWidth
          value={url}
          label="url"
          type="text"
          id="url"
          margin="dense"
          size="small"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          type="submit"
          id="create-button"
          fullWidth
          variant="contained"
          color="success"
        >
          create
        </Button>
      </Box>
    </Box>
    // </Container>
  )
}

BlogForm.proptypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
