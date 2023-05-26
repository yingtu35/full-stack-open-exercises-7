import { useRef } from "react"
import { useSelector } from "react-redux"

import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import BlogPagination from "./BlogPagination"

import PropTypes from "prop-types"

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
      <BlogPagination blogs={sortedBlogs} />
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
