import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { addLikes, createComment } from "../reducers/BlogReducer"
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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="enter your comment here"
        />
        <button type="submit">add comment</button>
      </div>
    </form>
  )
}

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  // const user = useSelector((state) => state.user)

  // const [showDetail, setShowDetail] = useState(false)

  // const toggleShowDetail = () => {
  //   setShowDetail((showDetail) => !showDetail)
  // }

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(addLikes(likedBlog))
  }

  // const handleRemove = async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     const isDeleted = dispatch(deleteBlog(blog))
  //     if (isDeleted) {
  //       const message = `a new blog ${blog.title} by ${blog.author} deleted`
  //       dispatch(notify(message, false))
  //     }
  //   }
  // }

  // const isUserBlog = blog.user.username === user.username

  // const hideWhenShowDetail = { display: showDetail ? "none" : "" }
  // const showWhenShowDetail = { display: showDetail ? "" : "none" }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={`//${blog.url}`} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div className="like">
        {blog.likes} likes
        <button onClick={handleLike} className="like-button">
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <BlogCommentForm id={id} />
      {blog.comments.length === 0 ? (
        <div>no comments</div>
      ) : (
        <ul>
          {blog.comments.map((comment, idx) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
      )}

      {/*  */}
      {/* <div>
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
      </div> */}
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
