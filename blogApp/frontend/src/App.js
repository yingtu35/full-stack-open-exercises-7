import { useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/logins"
import Notification from "./components/Notification"
import "./App.css"
import BlogForm from "./components/BlogForm"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "./reducers/NotificationReducer"
import { initializeBlogs } from "./reducers/BlogReducer"
import { setUser } from "./reducers/UserReducer"

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)

  const userLogin = async (credential) => {
    try {
      const returnedUser = await loginService.login(credential)
      blogService.setToken(returnedUser.token)
      window.localStorage.setItem("savedUser", JSON.stringify(returnedUser))
      dispatch(setUser(returnedUser))
      const message = `Logged in as ${returnedUser.name}`
      dispatch(notify(message, false))
      return true
    } catch (error) {
      const errorMsg = error.response.data.error
      dispatch(notify(errorMsg, true))
      return false
    }
  }

  const userLogout = () => {
    window.localStorage.removeItem("savedUser")
    dispatch(setUser(null))
  }

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem("savedUser"))
    if (savedUser) {
      blogService.setToken(savedUser.token)
      dispatch(setUser(savedUser))
    }
  }, [])

  useEffect(() => {
    user && dispatch(initializeBlogs())
  }, [user])

  return (
    <div>
      <h1 className="title">Bloglist</h1>
      <Notification />
      {!user ? (
        <Login userLogin={userLogin} />
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={userLogout} id="logout-button">
              logout
            </button>
          </div>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Blogs user={user} />
        </div>
      )}
    </div>
  )
}

export default App
