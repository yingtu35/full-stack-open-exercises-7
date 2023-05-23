import { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { addLikes, deleteBlog } from "../reducers/BlogReducer"
import { notify } from "../reducers/NotificationReducer"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "1px solid black",
  marginBottom: 5,
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [showDetail, setShowDetail] = useState(false)

  const toggleShowDetail = () => {
    setShowDetail((showDetail) => !showDetail)
  }

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(addLikes(likedBlog))
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const isDeleted = dispatch(deleteBlog(blog))
      if (isDeleted) {
        const message = `a new blog ${blog.title} by ${blog.author} deleted`
        dispatch(notify(message, false))
      }
    }
  }

  const isUserBlog = blog.user.username === user.username

  const hideWhenShowDetail = { display: showDetail ? "none" : "" }
  const showWhenShowDetail = { display: showDetail ? "" : "none" }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenShowDetail} onClick={toggleShowDetail}>
          View
        </button>
        <button style={showWhenShowDetail} onClick={toggleShowDetail}>
          Hide
        </button>
      </div>
      <div style={showWhenShowDetail} className="blogDetail">
        <div>{blog.id}</div>
        <div>{blog.url}</div>
        <div className="like">
          {blog.likes}{" "}
          <button onClick={handleLike} className="like-button">
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {isUserBlog && (
          <button onClick={handleRemove} id="remove-button">
            remove
          </button>
        )}
      </div>
    </div>
  )
}

Blog.proptypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
