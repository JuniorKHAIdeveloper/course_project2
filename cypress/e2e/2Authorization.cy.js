describe("Authorization Page", () => {
  it("account authorization wrong credentials", () => {
    cy.visit(Cypress.env("host"));
    cy.get('[name="email"]').type("test");
    cy.get('[name="password"]').type("test");
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Authorization error!");
  });

  it("account authorization login success", () => {
    cy.visit(Cypress.env("host"));
    cy.get('[name="email"]').type(Cypress.env("email"));
    cy.get('[name="password"]').type(Cypress.env("password"));
    cy.get('[type="submit"]').click();
    cy.wait(1000);
    cy.url().should('eq', `${Cypress.env("host")}/dashboard/rooms`);
    cy.getCookie('jwttoken').then((cookie) => {
      if (cookie) {
        cy.writeFile('./token.txt', cookie.value)
      }
    });
  });
});
