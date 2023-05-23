import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/logins"
import Notification from "./components/Notification"
import "./App.css"
import BlogForm from "./components/BlogForm"

const App = () => {
  const blogFormRef = useRef()

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [msg, setMsg] = useState("")
  const [isError, setIsError] = useState(false)

  const displayMsg = (message, error) => {
    setMsg(message)
    setIsError(error)
    setTimeout(() => {
      setMsg("")
      setIsError(false)
    },3000)
  }

  const userLogin = async (credential) => {
    try {
      const returnedUser = await loginService.login(credential)
      blogService.setToken(returnedUser.token)
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(returnedUser))
      setUser(returnedUser)
      const message = `Logged in as ${returnedUser.name}`
      displayMsg(message, false)
      return true
    }
    catch (error) {
      const errorMsg = error.response.data.error
      displayMsg(errorMsg, true)
      return false
    }
  }

  const userLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs => blogs.concat(returnedBlog))
      const message = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      displayMsg(message,false)
      blogFormRef.current.toggleVisibility()
      return true
    }
    catch (error) {
      const errorMsg = error.response.data.error
      displayMsg(errorMsg, true)
      return false
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog)
        setBlogs(blogs => blogs.filter(otherBlog => otherBlog.id !== blog.id))
        const message = `blog '${blog.title}' by '${blog.author}' deleted`
        displayMsg(message,false)
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  const addLikes = async (newBlog) => {
    try {
      const returnedBlog = await blogService.update(newBlog)
      setBlogs(blogs => blogs.map(blog => blog.id === returnedBlog.id? returnedBlog : blog))
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const loggedBloglistUser = JSON.parse(window.localStorage.getItem("loggedBloglistUser"))
    if (loggedBloglistUser) {
      blogService.setToken(loggedBloglistUser.token)
      setUser(loggedBloglistUser)
    }
  }, [])

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const returnedBlogs = await blogService.getAll()
        setBlogs( returnedBlogs )
      } catch (error) {
        console.log(error)
      }
    }
    user && getBlogs()
  }, [user])

  return (
    <div>
      <h1 className="title">Bloglist</h1>
      <Notification msg={msg} isError={isError} />
      {!user
        ? (<Login userLogin={userLogin} />)
        : (
          <div>
            <h2>blogs</h2>
            <div>
              {user.name} logged in
              <button onClick={userLogout} id="logout-button">logout</button>
            </div>
            <Togglable buttonLabel="new note" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <Blogs
              blogs={blogs}
              user={user}
              addLikes={addLikes}
              removeBlog={removeBlog} />
          </div>
        )
      }
    </div>
  )
}

export default App