describe("Devices Page", () => {
  beforeEach(() => {
    cy.readFile('./token.txt').then((jwttoken) => {
      cy.setCookie('jwttoken', jwttoken)
    })
  });

  it("create device empty data validation", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/devices`);
    cy.get("#add-icon").click();
    cy.get("body").contains("Add new device");
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Device not created!");
  });

  it("create device successfully", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/devices`);
    cy.get("#add-icon").click();
    cy.get("body").contains("Add new device");
    cy.get('[name="deviceName"]').type(Cypress.env("deviceName"));
    cy.get('[name="accessToken"]').type(Cypress.env("accessToken"));
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Device created!");
  });
});
