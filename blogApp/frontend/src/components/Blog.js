import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { addLikes, createComment } from "../reducers/BlogReducer"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

// import { notify } from "../reducers/NotificationReducer"

const BlogCommentForm = ({ id }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { comment }
    const isCreated = dispatch(createComment(id, payload))
    if (isCreated) {
      setComment("")
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 1,
        boxShadow: "0 5px 5px 0 #888888",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
    >
      <TextField
        multiline
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        rows={4}
        label="Leave a comment"
      />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => setComment("")}
        >
          Reset
        </Button>
        <Button type="submit" variant="contained">
          Add comment
        </Button>
      </Box>
    </Box>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <input
    //       value={comment}
    //       onChange={(e) => setComment(e.target.value)}
    //       placeholder="Enter your comment here"
    //     />
    //     <button type="submit">add comment</button>
    //   </div>
    // </form>
  )
}

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(addLikes(likedBlog))
  }

  return (
    <Box>
      <Box
        sx={{
          mt: 1,
          py: 2,
          px: 2,
          backgroundColor: "ghostwhite",
          borderRadius: 5,
        }}
      >
        <Typography component="h2" variant="h4">
          {blog.title}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontStyle: "italic" }}
        >
          URL:{" "}
          <a href={`//${blog.url}`} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </Typography>
        <div className="like">
          {blog.likes} likes
          <button onClick={handleLike} className="like-button">
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
      </Box>
      <Box
        sx={{
          mt: 2,
          py: 2,
          px: 2,
          backgroundColor: "ghostwhite",
          borderRadius: 5,
        }}
      >
        <Typography component="h2" variant="h4">
          Comments
        </Typography>
        <BlogCommentForm id={id} />
      </Box>
      <Box
        sx={{
          mt: 1,
          py: 2,
          px: 2,
          backgroundColor: "ghostwhite",
          borderRadius: 5,
        }}
      >
        {blog.comments.length === 0 ? (
          <Typography variant="body">No comments</Typography>
        ) : (
          <ul>
            {blog.comments.map((comment, idx) => (
              <li key={idx}>{comment}</li>
            ))}
          </ul>
        )}
      </Box>
    </Box>
  )
}

Blog.proptypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
