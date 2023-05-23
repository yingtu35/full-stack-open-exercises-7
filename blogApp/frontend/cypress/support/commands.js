// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username, password
  })
    .then(response => {
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(response.body))
      cy.visit("")
    })
})

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    headers: {
      "Authorization": `Bearer ${JSON.parse(window.localStorage.getItem("loggedBloglistUser")).token}`
    },
    body: {
      title, author, url
    }
  })

  cy.visit("")
})


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })