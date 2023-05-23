describe("bloglist app", () => {
  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`)

    const user = {
      username: "root",
      password: "root",
      name: "admin"
    }
    const anotherUser = {
      username: "daniel",
      password: "daniel",
      name: "daniel"
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, anotherUser)
    cy.visit("")
  })

  it("Page is shown", function() {
    cy.get("h1").contains("Bloglist")
  })

  it("Login form is shown", function() {
    cy.contains("log in to application")
    cy.get(".login-form").as("loginForm")
    cy.get("@loginForm")
      .contains("username")
    cy.get("@loginForm")
      .contains("password")
    cy.get("@loginForm")
      .contains("login")
  })

  describe("Login", () => {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("root")
      cy.get("#password").type("root")
      cy.get("#login-button").click()

      // successful login notification is display green
      cy.get(".success")
        .should("contain", "Logged in as admin")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid")
        .and("have.css", "border-color", "rgb(0, 128, 0)")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("root")
      cy.get("#password").type("wrong-password")
      cy.get("#login-button").click()

      cy.get(".error")
        .should("contain", "Invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid")
        .and("have.css", "border-color", "rgb(255, 0, 0)")
    })

    describe("When logged in", function() {
      beforeEach(function() {
        // log in user
        cy.login({
          username: "root",
          password: "root"
        })
      })
      it("A blog can be created", function() {
        cy.contains("new note").click()

        cy.get("#title").type("test blog")
        cy.get("#author").type("admin")
        cy.get("#url").type("www.cypress.test.com")
        cy.get("#create-button").click()

        // successful blog creation notification
        cy.get(".success")
          .should("contain", "a new blog test blog by admin added")
          .and("have.css", "color", "rgb(0, 128, 0)")
          .and("have.css", "border-style", "solid")
          .and("have.css", "border-color", "rgb(0, 128, 0)")

        // the new created blog is added to the list
        cy.get(".blogs").contains("test blog")
      })

      describe("when blogs exist", function() {
        beforeEach(function() {
          // create some blogs
          cy.createBlog({ title: "first blog", author: "admin", url: "www.blog1.com" })
          cy.createBlog({ title: "second blog", author: "admin", url: "www.blog2.com" })
          cy.createBlog({ title: "third blog", author: "admin", url: "www.blog3.com" })
        })

        it("user can like a blog", function() {
          cy.get(".blog").eq(0).contains("View").click()
          cy.get(".blogDetail").get(".like").as("likesCount")
          cy.get("@likesCount")
            .should("contain", "0")
          cy.get("@likesCount")
            .get(".like-button")
            .eq(0)
            .click()
          cy.get("@likesCount")
            .should("contain", "1")
        })

        it.only("blogs are sorted according to the likes in descending order", function() {
          cy.get(".blog").eq(0).contains("View").click()
          cy.get(".like-button").eq(0).as("mostLiked")
          cy.get(".blog").eq(1).contains("View").click()
          cy.get(".like-button").eq(1).as("secondMostLiked")
          cy.get(".blog").eq(2).contains("View").click()
          cy.get(".like-button").eq(2).as("leastLiked")

          cy.get("@leastLiked").click()
          cy.wait(500)
          cy.get("@mostLiked").click()
          cy.wait(500)
          cy.get("@leastLiked").click()
          cy.wait(500)

          cy.get(".blog").eq(0).should("contain", "third blog")
          cy.get(".blog").eq(1).should("contain", "second blog")
          cy.get(".blog").eq(2).should("contain", "first blog")
        })

        it("user can see the remove button and delete a blog the user created", function() {
          cy.get(".blog").eq(0).contains("View").click()
          cy.get(".blogDetail").get("#remove-button").as("removeButton")

          cy.get("@removeButton").should("exist")
          cy.get("@removeButton").click()

          // blog deletion notification
          cy.get(".success")
            .should("contain", "blog 'first blog' by 'admin' deleted")
            .and("have.css", "color", "rgb(0, 128, 0)")
            .and("have.css", "border-style", "solid")
            .and("have.css", "border-color", "rgb(0, 128, 0)")

          // the blog should be removed from the bloglist
          cy.get(".blogs")
            .should("not.contain", "first blog")
        })

        it("user cannot see the remove button of a blog not created by the user", function() {
          cy.get("#logout-button").click()
          cy.login({ username: "daniel", password: "daniel" })

          cy.get(".blog").eq(0).contains("View").click()
          cy.get(".blogDetail")
            .should("not.contain", "remove")
        })
      })
    })
  })
})