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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
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

require('@4tw/cypress-drag-drop');

Cypress.Commands.add("configuration", () =>  {

    cy.visit('../dist/index.html');

    cy.get('#nameInput').type('Region 1').should('have.value', 'Region 1');
    cy.get('#visitorInput').type('500').should('have.value', '500');
    cy.get('#step1-button').click();

    cy.get('#tentInput').type('6').should('have.value', '6');
    cy.get('#step2-button').click();

    cy.get('#eatingStallInput').type('3').should('have.value', '3');
    cy.get('#step3-button').click();

    cy.get('#drinkStallInput').type('2').should('have.value', '2');
    cy.get('#step4-button').click();

    cy.get('#highTreeInput').type('0').should('have.value', '0');
    cy.get('#wideTreeInput').type('0').should('have.value', '0');
    cy.get('#shadowTreeInput').type('0').should('have.value', '0');
    cy.get('#step5-button').click();

    cy.get('#toiletBuildingsInput').type('3').should('have.value', '3');
    cy.get('#step6-button').click();

    cy.get('#trashCanInput').type('2').should('have.value', '2');
    cy.get('#step7-button').click();
});

Cypress.Commands.add("clearThenType", { prevSubject: true }, (subject, text) => {
    cy.wrap(subject).clear({force: true}).type(text);
  }
);