import { Link } from "react-router-dom"

import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const BlogCard = ({ blog }) => {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: "ghostwhite" }}>
      <CardContent>
        <Typography variant="h5" color="text.primary" gutterBottom>
          {blog.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {blog.author}
        </Typography>
        <Typography variant="body2">{blog.url}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`/blogs/${blog.id}`}>
          <Button size="small">Learn more</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default BlogCard
