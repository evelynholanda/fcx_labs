

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
      cy.visit('/login')
      cy.get('#username').type(ana)
      cy.get('#password').type(senha123)
      cy.get('#loginButton').click()
      cy.url().should('include', '/dashboard')
    })
  })