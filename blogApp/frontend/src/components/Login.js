import { useState } from "react"
import PropTypes from "prop-types"

const Login = ({ userLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const credential = {
      username, password
    }
    const isLogged = await userLogin(credential)
    if (isLogged) {
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div>
          <label htmlFor="username">username</label>
          <input type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

Login.proptypes = {
  userLogin: PropTypes.string.isRequired
}

export default Login