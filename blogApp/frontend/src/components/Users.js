import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import usersService from "../services/users"

import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

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
      <Typography component="h2" variant="h3">
        All Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "300px" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Username</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Name</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Blogs created</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Profile</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
                <TableCell align="right">
                  <Link to={`/users/${user.id}`}>Link</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
