/// <reference types="cypress" />

describe('The Team Info page works as expected (/teams/{teamId} route)', () => {
  it('should navigate to the team info page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/teams');

    cy.get('a').last().click();

    // The new url should include "/teams/55"
    cy.url().should('include', '/teams/55');
  })

  it('should show the correct team information', () => {
    cy.visit('http://localhost:3000/teams/55');

    cy.get('h2').contains('Seattle Kraken');
    cy.get('p').first().contains('Western Conference');
    cy.get('p').last().contains('Pacific Division');
  })
});

export {};
