describe("Devices Page", () => {
  beforeEach(() => {
    cy.readFile('./token.txt').then((jwttoken) => {
      cy.setCookie('jwttoken', jwttoken)
    })
  });

  it("create device empty data validation", () => {
    cy.visit("http://localhost:3000/dashboard/devices");
    cy.get("#add-icon").click();
    cy.get("body").contains("Add new device");
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Device not created!");
  });

  it("create device successfully", () => {
    cy.visit("http://localhost:3000/dashboard/devices");
    cy.get("#add-icon").click();
    cy.get("body").contains("Add new device");
    cy.get('[name="deviceName"]').type("Device 1");
    cy.get('[name="accessToken"]').type("DEVICE_1");
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Device created!");
  });
});
