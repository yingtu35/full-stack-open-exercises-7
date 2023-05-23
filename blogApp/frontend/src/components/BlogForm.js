import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title, author, url
    }
    const isAdded = await createBlog(newBlog)
    if (isAdded) {
      setTitle("")
      setAuthor("")
      setUrl("")
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input type="text"
            id="title"
            value={title}
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input type="text"
            id="author"
            value={author}
            placeholder="author"
            onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input type="text"
            id="url"
            value={url}
            placeholder="url"
            onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit" id="create-button">create</button>
      </form>
    </div>
  )
}

BlogForm.proptypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm