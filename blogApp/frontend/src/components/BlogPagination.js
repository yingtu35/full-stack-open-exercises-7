import { useState } from "react"
import BlogCard from "./BlogCard"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"

const BlogPagination = ({ blogs }) => {
  const [pageIndex, setPageIndex] = useState(0)
  const blogsPerPage = 6

  const handlePageChange = (event, page) => {
    setPageIndex(page - 1)
  }

  const blogsToShow = blogs.slice(
    pageIndex * blogsPerPage,
    (pageIndex + 1) * blogsPerPage
  )

  return (
    <Box>
      <Grid
        container
        spacing={2}
        className="blogs"
        sx={{
          my: 1,
        }}
      >
        {blogsToShow.map((blog) => (
          <Grid key={blog.id} item xs={12} sm={6}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Pagination
          count={Math.ceil(blogs.length / blogsPerPage)}
          color="primary"
          defaultPage={1}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  )
}

export default BlogPagination
