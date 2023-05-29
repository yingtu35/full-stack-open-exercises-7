import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import usersService from "../services/users"
import BlogPagination from "./BlogPagination"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const User = () => {
  const [user, setUser] = useState()
  const id = useParams().id

  useEffect(() => {
    usersService.getUser(id).then((returnedUser) => setUser(returnedUser))
  }, [id])

  if (!user) return
  return (
    <div>
      <Typography component="h2" variant="h3">
        {user.username}
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Typography component="h3" variant="h4">
          <strong>Added blogs</strong>
        </Typography>
      </Box>
      <BlogPagination blogs={user.blogs} />
    </div>
  )
}

export default User
