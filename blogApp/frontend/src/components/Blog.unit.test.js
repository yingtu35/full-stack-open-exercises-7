import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe ("<Blog>", () => {
  let container
  let addLikes
  let removeBlog

  beforeEach(() => {
    const user = {
      username: "test",
      name: "test"
    }
    const blog = {
      title: "test title",
      author: "test author",
      url: "www.test.com",
      likes: 0,
      id: "testtesttest",
      user: user
    }

    addLikes = jest.fn()
    removeBlog = jest.fn()
    container = render(
      <Blog blog={blog} user={user} addLikes={addLikes} removeBlog={removeBlog} />
    ).container
  })

  test("at start, render blog's title and author only", () => {
    const element = screen.getByText("test title test author")
    const detail = container.querySelector(".blogDetail")
    expect(element).toBeDefined()
    expect(detail).toHaveStyle("display: none")
  })

  test("shows url and likes when the view button is clicked", async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText("View")
    await user.click(viewButton)
    const detail = container.querySelector(".blogDetail")
    const urlElement = screen.getByText("www.test.com")
    const likesElement = screen.getByText("0")
    expect(detail).not.toHaveStyle("display: none")
    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
  })

  test("calls addLikes function twice when the like button is clicked twice", async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText("View")
    await user.click(viewButton)
    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(addLikes.mock.calls).toHaveLength(2)
  })

  test("shows remove button when user owns the blog", async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText("View")
    await user.click(viewButton)

    const removeButton = screen.getByText("remove")
    expect(removeButton).toBeDefined()
  })

  test("calls removeBlog function when the remove button is clicked", async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText("View")
    await user.click(viewButton)

    const removeButton = screen.getByText("remove")
    await user.click(removeButton)

    expect(removeBlog.mock.calls).toHaveLength(1)
  })
})
