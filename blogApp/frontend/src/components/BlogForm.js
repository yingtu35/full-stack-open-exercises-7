import { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/BlogReducer"
import { notify } from "../reducers/NotificationReducer"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const BlogForm = () => {
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
    }
  }

  return (
    // <div>
    //   <h2>create new</h2>
    //   <form onSubmit={addBlog}>
    //     <div>
    //       <label htmlFor="title">title:</label>
    //       <input
    //         type="text"
    //         id="title"
    //         value={title}
    //         placeholder="title"
    //         onChange={(e) => setTitle(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="author">author:</label>
    //       <input
    //         type="text"
    //         id="author"
    //         value={author}
    //         placeholder="author"
    //         onChange={(e) => setAuthor(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="url">url:</label>
    //       <input
    //         type="text"
    //         id="url"
    //         value={url}
    //         placeholder="url"
    //         onChange={(e) => setUrl(e.target.value)}
    //       />
    //     </div>
    //     <button type="submit" id="create-button">
    //       create
    //     </button>
    //   </form>
    // </div>
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create a new blog
        </Typography>
        <Box component="form" onSubmit={addBlog} className="login-form">
          <TextField
            autoComplete="title"
            autoFocus
            required
            fullWidth
            defaultValue={title}
            label="title"
            type="text"
            id="title"
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoComplete="author"
            autoFocus
            required
            fullWidth
            defaultValue={author}
            label="author"
            type="text"
            id="author"
            margin="normal"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            autoComplete="url"
            autoFocus
            required
            fullWidth
            defaultValue={url}
            label="url"
            type="text"
            id="url"
            margin="normal"
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            id="create-button"
            fullWidth
            variant="contained"
          >
            create
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

BlogForm.proptypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
