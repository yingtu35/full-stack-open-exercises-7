import { useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import Togglable from "./Togglable"
import BlogForm from "./BlogForm"

import PropTypes from "prop-types"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "1px solid black",
  marginBottom: 5,
}

const Blogs = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const compareLikes = (blog1, blog2) => {
    if (blog1.likes > blog2.likes) {
      return -1
    } else if (blog1.likes < blog2.likes) {
      return 1
    } else {
      return 0
    }
  }

  const sortedBlogs = blogs.toSorted(compareLikes)
  return (
    <div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <div className="blogs">
        {sortedBlogs.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div style={blogStyle} className="blog">
              {blog.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

Blogs.proptypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blogs
