/// <reference types="cypress" />

describe('The Teams page works as expected (/teams route)', () => {
  it('should navigate to the teams page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Find a link with an href attribute containing "teams" and click it
    cy.get('a[href*="teams"]').click({ multiple: true });

    // The new url should include "/teams"
    cy.url().should('include', '/teams');
  })

  it('should show the correct number of teams', () => {
    cy.visit('http://localhost:3000/teams');

    cy.get('h1').contains('NHL Teams');
    cy.get('h2').should('have.length', 32);
    cy.get('p').should('have.length', 64);
  })
});

export {};
