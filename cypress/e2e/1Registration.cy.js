describe("Registration Page", () => {
  it("account registration empty data validation", () => {
    cy.visit(`${Cypress.env("host")}/signup`);
    cy.get('[type="submit"]').click();
    cy.get("#firstName-helper-text").contains("Field is required.");
    cy.get("#lastName-helper-text").contains("Field is required.");
    cy.get("#email-helper-text").contains("Not valid email.");
    cy.get("#firstPassword-helper-text").contains("Not valid password.");
    cy.get("#secondPassword-helper-text").contains("Password mismatch.");
  });

  it("account registration fill data success", () => {
    cy.visit(`${Cypress.env("host")}/signup`);
    cy.get('[name="firstName"]').type(Cypress.env("firstName"));
    cy.get('[name="lastName"]').type(Cypress.env("lastName"));
    cy.get('[name="email"]').type(Cypress.env("email"));
    cy.get('[name="firstPassword"]').type(Cypress.env("password"));
    cy.get('[name="secondPassword"]').type(Cypress.env("password"));
    cy.get('[type="submit"]').click();
    cy.get("body").contains("User created!");
    cy.url().should('eq', `${Cypress.env("host")}/`);
  });
});
