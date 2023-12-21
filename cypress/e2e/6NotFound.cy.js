describe("NotFound Page", () => {
  beforeEach(() => {
    cy.readFile("./token.txt").then((jwttoken) => {
      cy.setCookie("jwttoken", jwttoken);
    });
  });

  it("renders 404 not found page for undefined route", () => {
    cy.visit(`${Cypress.env("host")}/notfound`);
    cy.get("body").contains("page not found");
  });
});
