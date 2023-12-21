describe("AboutUs Page", () => {
  beforeEach(() => {
    cy.readFile("./token.txt").then((jwttoken) => {
      cy.setCookie("jwttoken", jwttoken);
    });
  });

  it("should render aboutus info", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/aboutus`);
    cy.get("body").contains(Cypress.env("topic"));
    cy.get("body").contains(Cypress.env("description"));
  });
});
