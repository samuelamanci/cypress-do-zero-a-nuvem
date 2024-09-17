Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Samuel')
  cy.get('#lastName').type('Oliveira')
  cy.get('#email').type('samuel@gmail.com')
  cy.get('#phone').type('123456789')
  cy.get('#open-text-area').type('Texto comando customizado') //adiciona um delay no comando type, caso eu use zero, ele não perde tempo digitando.
  cy.get('button[type="submit"]').click()
  })

  Cypress.Commands.add('CustomCommandsWithObject', (dados) => {
    cy.get('#firstName').type(dados.firstName)
    cy.get('#lastName').type(dados.lastName)
    cy.get('#email').type(dados.email)
    cy.get('#phone').type(dados.telefone)
    cy.get('#open-text-area').type(dados.text) //adiciona um delay no comando type, caso eu use zero, ele não perde tempo digitando.
    cy.get('button[type="submit"]').click()
    })
