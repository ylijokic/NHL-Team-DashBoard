/// <reference types="cypress" />

describe('The Players page works as expected (/teams/${teamId}/players route)', () => {
  it('should navigate to the teams page', () => {
    // Start from the teams page
    cy.visit('http://localhost:3000/teams');

    cy.get('a').last().click();
    // The new url should include "/teams/55"
    cy.url().should('include', '/teams/55');

    cy.get('button').click();
    // The new url should include "/teams/55/players"
    cy.url().should('include', '/teams/55/players');

  })

  it('should show the correct roster data', () => {
    cy.visit('http://localhost:3000/teams/55/players');

    cy.get('h1').contains('Kraken Roster');
    cy.get('a').last().contains('Shane Wright');
    cy.get('a').last().contains('Center');
    cy.get('a').last().contains('#51');
  })

  it('should show the correct player data', () => {
    cy.get('a').last().click();
    cy.url().should('include', '/teams/55/players/8483524');
    cy.get('h2').contains('Shane Wright');
    cy.get('tr').last().contains('Is a Rookie');
    cy.get('tr').last().contains('Yes');

  })
});

export {};
