describe("Logout Page", () => {
  beforeEach(() => {
    cy.readFile("./token.txt").then((jwttoken) => {
      cy.setCookie("jwttoken", jwttoken);
    });
  });

  it("check if user can logout", () => {
    cy.visit(`${Cypress.env("host")}/dashboard`);
    cy.get("#avatar").click();
    cy.get("#logout").click();
    cy.url().should('eq', `${Cypress.env("host")}/`);
    cy.get("body").contains("Sign in");
  });
});
