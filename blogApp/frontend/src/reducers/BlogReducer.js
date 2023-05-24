import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      const newBlog = action.payload
      state.push(newBlog)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    filterBlog: (state, action) => {
      const deletedBlog = action.payload
      return state.filter((blog) => blog.id !== deletedBlog.id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, filterBlog } =
  blogReducer.actions
export default blogReducer.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const returnedBlogs = await blogService.getAll()
      dispatch(setBlogs(returnedBlogs))
    } catch (error) {
      console.log(error)
    }
  }
}

// TODO: how and where to properly set the notification message
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      dispatch(appendBlog(returnedBlog))
      // const message = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      // dispatch()
      // blogFormRef.current.toggleVisibility()
      return true
    } catch (error) {
      console.log(error)
      // const errorMsg = error.response.data.error
      // displayMsg(errorMsg, true)
      return false
    }
  }
}

export const addLikes = (likedBlog) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.update(likedBlog)
      dispatch(updateBlog(returnedBlog))
    } catch (error) {
      console.log(error)
    }
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.addComment(id, comment)
      dispatch(updateBlog(returnedBlog))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog)
      dispatch(filterBlog(blog))
      // const message = `blog '${blog.title}' by '${blog.author}' deleted`
      // displayMsg(message, false)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
