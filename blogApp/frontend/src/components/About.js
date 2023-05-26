import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
// import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

// const paperStyle = { p: 3, mb: 4 }

const features = [
  {
    title: "Discover",
    description: [
      "Explore a wide range of blog posts on various topics",
      "Discover new perspectives, gain knowledge",
      "Stay updated with the latest trends in your areas of interest",
    ],
  },
  {
    title: "Create",
    description: [
      "Share your knowledge and experiences by creating your own blog posts",
      "Engage with a community of like-minded individuals",
      "Make an impact by contributing valuable content",
    ],
  },
  {
    title: "Connect",
    description: [
      "Connect with other bloggers and readers to exchange ideas and insights",
      "Foster meaningful connections, engage in discussions",
      "Collaborate with fellow enthusiasts to expand your network and learn from each other",
    ],
  },
]

const FeatureCard = ({ feature }) => {
  return (
    <Card sx={{ minWidth: 200, backgroundColor: "ghostwhite" }}>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom align="left">
          {feature.title}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {blog.author}
        </Typography> */}
        <ul style={{ listStyleType: "none" }}>
          {feature.description.map((line) => (
            <Typography component="li" variant="h6" align="left" key={line}>
              {line}
            </Typography>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

const About = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 4, textAlign: "center" }}>
      <Container maxWidth="md">
        <Typography
          sx={{ fontSize: "128px" }}
          variant="h2"
          component="h1"
          gutterBottom
        >
          BlogApp
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          A platform for sharing and discovering amazing blog posts
        </Typography>
        <Grid sx={{ mt: "auto" }} container spacing={4} justify="center">
          {features.map((feature, idx) => (
            <Grid key={idx} item xs={12} sm={12}>
              <FeatureCard feature={feature} />
            </Grid>
          ))}
          {/* <Grid item xs={12} sm={4}>
            <Paper style={paperStyle}>
              <Typography variant="h4" component="h2" gutterBottom>
                Discover
              </Typography>
              <Typography variant="body1" component="p">
                Explore a wide range of blog posts on various topics.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper style={paperStyle}>
              <Typography variant="h4" component="h2" gutterBottom>
                Create
              </Typography>
              <Typography variant="body1" component="p">
                Share your knowledge and experiences by creating your own blog
                posts.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper style={paperStyle}>
              <Typography variant="h4" component="h2" gutterBottom>
                Connect
              </Typography>
              <Typography variant="body1" component="p">
                Connect with other bloggers and readers to exchange ideas and
                insights.
              </Typography>
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  )
}

export default About
