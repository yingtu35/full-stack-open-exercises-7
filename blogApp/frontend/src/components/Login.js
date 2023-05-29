import { useState } from "react"
import PropTypes from "prop-types"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Typography from "@mui/material/Typography"

const Login = ({ userLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isRemember, setIsRemember] = useState(true)

  const handleLogin = async (e) => {
    e.preventDefault()

    const credential = {
      username,
      password,
      isRemember,
    }
    const isLogged = await userLogin(credential)
    if (isLogged) {
      setUsername("")
      setPassword("")
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Log in to application
        </Typography>
        <Box component="form" onSubmit={handleLogin} className="login-form">
          <TextField
            autoComplete="username"
            autoFocus
            required
            fullWidth
            defaultValue={username}
            label="username"
            type="text"
            id="username"
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            autoComplete="password"
            autoFocus
            required
            fullWidth
            defaultValue={password}
            label="password"
            type="text"
            id="password"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            checked={isRemember}
            onClick={() => setIsRemember(!isRemember)}
          />
          <Button type="submit" id="login-button" fullWidth variant="contained">
            login
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

Login.proptypes = {
  userLogin: PropTypes.string.isRequired,
}

export default Login
