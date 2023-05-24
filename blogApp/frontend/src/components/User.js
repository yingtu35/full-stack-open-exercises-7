import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import usersService from "../services/users"

const User = () => {
  // TODO: fetch user data from here
  const [user, setUser] = useState()
  const id = useParams().id

  useEffect(() => {
    usersService.getUser(id).then((returnedUser) => setUser(returnedUser))
  }, [])

  if (!user) return
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>
        <strong>added blogs</strong>
      </h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
