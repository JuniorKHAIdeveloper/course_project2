describe("Authorization Page", () => {
  it("account authorization wrong credentials", () => {
    cy.visit("http://localhost:3000");
    cy.get('[name="email"]').type("test");
    cy.get('[name="password"]').type("test");
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Authorization error!");
  });

  it("account authorization login success", () => {
    cy.visit("http://localhost:3000");
    cy.get('[name="email"]').type("test1@test.test");
    cy.get('[name="password"]').type("testtest");
    cy.get('[type="submit"]').click();
    cy.wait(1000); // Adjust the wait time based on your application's behavior
    cy.url().should('eq', 'http://localhost:3000/dashboard/rooms');
    cy.getCookie('jwttoken').then((cookie) => {
      if (cookie) {
        cy.writeFile('./token.txt', cookie.value)
      }
    });
  });
});
