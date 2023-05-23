import Blog from "./Blog"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

const Blogs = () => {
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
    <div className="blogs">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
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
