import { useState } from "react"
import PropTypes from "prop-types"


const Blog = ({ blog, user, addLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "1px solid black",
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)

  const toggleShowDetail = () => {
    setShowDetail(showDetail => !showDetail)
  }

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await addLikes(newBlog)
  }

  const handleRemove = async () => {
    await removeBlog(blog)
  }

  const hideWhenShowDetail = { display: showDetail? "none" : "" }
  const showWhenShowDetail = { display: showDetail? "" : "none" }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenShowDetail} onClick={toggleShowDetail}>View</button>
        <button style={showWhenShowDetail} onClick={toggleShowDetail}>Hide</button>
      </div>
      <div style={showWhenShowDetail} className="blogDetail">
        <div>{blog.id}</div>
        <div>{blog.url}</div>
        <div className="like">{blog.likes} <button onClick={handleLike} className="like-button">like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && (<button onClick={handleRemove} id="remove-button">remove</button>)}
      </div>
    </div>
  )}

Blog.proptypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog