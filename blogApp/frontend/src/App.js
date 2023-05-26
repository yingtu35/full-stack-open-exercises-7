import { useEffect } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import About from "./components/About"
import Blog from "./components/Blog"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import Users from "./components/Users"
import User from "./components/User"
import Notification from "./components/Notification"
import Copyright from "./components/Copyright"
import NavBar from "./components/NavBar"

import blogService from "./services/blogs"
import loginService from "./services/logins"

import "./App.css"

import { notify } from "./reducers/NotificationReducer"
import { initializeBlogs } from "./reducers/BlogReducer"
import { setUser } from "./reducers/UserReducer"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
// import Typography from "@mui/material/Typography"

// const navPadding = {
//   padding: "0.5em",
// }

// const Title = () => {
//   return (
//     <Typography component="h1" variant="h2" className="title">
//       Blog App
//     </Typography>
//   )
// }

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
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <NavBar user={user} userlogout={userLogout} />
        <Notification />
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate replace to="/" />
              ) : (
                <Login userLogin={userLogin} />
              )
            }
          />
          <Route path="/users/:id" element={<User />} />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route
            path="/blogs"
            element={user ? <Blogs /> : <Navigate replace to="/login" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/" element={user ? <Blogs /> : <About />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: "grey",
          }}
        >
          <Copyright />
        </Box>
      </Box>
    </Container>
  )
}

export default App
