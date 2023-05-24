import { useEffect } from "react"
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Blog from "./components/Blog"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import Users from "./components/Users"
import User from "./components/User"
import Notification from "./components/Notification"

import blogService from "./services/blogs"
import loginService from "./services/logins"

import "./App.css"

import { notify } from "./reducers/NotificationReducer"
import { initializeBlogs } from "./reducers/BlogReducer"
import { setUser } from "./reducers/UserReducer"

const navPadding = {
  padding: "0.5em",
}

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const userLogin = async (credential) => {
    try {
      const returnedUser = await loginService.login(credential)
      blogService.setToken(returnedUser.token)
      const savedUser = {
        ...returnedUser,
        timestamp: Date.now() + returnedUser.expiration * 1000,
      }
      window.localStorage.setItem("savedUser", JSON.stringify(savedUser))
      dispatch(setUser(returnedUser))
      const message = `Logged in as ${returnedUser.name}`
      dispatch(notify(message, false))
      navigate("/")
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
    navigate("/login")
  }

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem("savedUser"))
    // TODO: should check if token has expired
    if (savedUser && savedUser.timestamp > Date.now()) {
      blogService.setToken(savedUser.token)
      dispatch(setUser(savedUser))
    }
  }, [])

  useEffect(() => {
    user && dispatch(initializeBlogs())
  }, [user])

  return (
    <div>
      <nav>
        <Link style={navPadding} to={"/blogs"}>
          blogs
        </Link>
        <Link style={navPadding} to={"/users"}>
          users
        </Link>
        {!user ? (
          <Link style={navPadding} to={"/login"}>
            login
          </Link>
        ) : (
          <span>
            {user.name} logged in
            <button onClick={userLogout} id="logout-button">
              logout
            </button>
          </span>
        )}
      </nav>
      <h1 className="title">Blog App</h1>
      <Notification />
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate replace to="/" /> : <Login userLogin={userLogin} />
          }
        />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route
          path="/blogs"
          element={user ? <Blogs /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/"
          element={user ? <Blogs /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
