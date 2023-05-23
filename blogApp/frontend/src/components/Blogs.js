import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({ blogs, user, addLikes, removeBlog }) => {
  const compareLikes = (blog1, blog2) => {
    if (blog1.likes > blog2.likes) {
      return -1;
    } else if (blog1.likes < blog2.likes) {
      return 1;
    } else {
      return 0;
    }
  };

  blogs.sort(compareLikes);
  return (
    <div className="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          addLikes={addLikes}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

Blogs.proptypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blogs;
