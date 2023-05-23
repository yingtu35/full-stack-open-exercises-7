import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("<BlogForm>", () => {
  test("calls event handler with the right details of blog", async () => {
    const createBlog = jest.fn(() => true)

    render(
      <BlogForm createBlog={createBlog} />
    )

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText("title")
    const authorInput = screen.getByPlaceholderText("author")
    const urlInput = screen.getByPlaceholderText("url")
    const button = screen.getByText("create")
    await user.type(titleInput, "test title")
    await user.type(authorInput, "test author")
    await user.type(urlInput, "test url")
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("test title")
    expect(createBlog.mock.calls[0][0].author).toBe("test author")
    expect(createBlog.mock.calls[0][0].url).toBe("test url")
  })

  test("clean input fields after event handler call return true", async () => {
    const createBlog = jest.fn(() => {return true})

    render(
      <BlogForm createBlog={createBlog} />
    )

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText("title")
    const authorInput = screen.getByPlaceholderText("author")
    const urlInput = screen.getByPlaceholderText("url")
    const button = screen.getByText("create")
    await user.type(titleInput, "test title")
    await user.type(authorInput, "test author")
    await user.type(urlInput, "test url")
    await user.click(button)

    expect(titleInput).toHaveValue("")
    expect(authorInput).toHaveValue("")
    expect(urlInput).toHaveValue("")
  })

  test("retain input fields after event handler call return false", async () => {
    const createBlog = jest.fn(() => {return false})

    render(
      <BlogForm createBlog={createBlog} />
    )

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText("title")
    const authorInput = screen.getByPlaceholderText("author")
    const urlInput = screen.getByPlaceholderText("url")
    const button = screen.getByText("create")
    await user.type(titleInput, "test title")
    await user.type(authorInput, "test author")
    await user.type(urlInput, "test url")
    await user.click(button)

    expect(titleInput).toHaveValue("test title")
    expect(authorInput).toHaveValue("test author")
    expect(urlInput).toHaveValue("test url")
  })
})