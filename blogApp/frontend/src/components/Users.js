import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import usersService from "../services/users"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      const returnedUsers = await usersService.getAll()
      setUsers(returnedUsers)
    }
    getUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>
              <strong>user</strong>
            </th>
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
