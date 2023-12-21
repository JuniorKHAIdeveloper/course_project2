describe("Unauthorized Page", () => {
  it("check if unauthorized access is not avialble", () => {
    cy.visit(`${Cypress.env("host")}/dashboard`);
    cy.get("body").contains("Unauthorized!");
    cy.get("body").contains("Permission denied.");
  });
});
