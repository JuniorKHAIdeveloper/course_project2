describe("Rooms Page", () => {
  beforeEach(() => {
    cy.readFile("./token.txt").then((jwttoken) => {
      cy.setCookie("jwttoken", jwttoken);
    });
  });

  it("create room successfully", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/rooms`);
    cy.get("#new-room").click();
    cy.get("body").contains("Create new room");
    cy.get('[name="roomName"]').type(Cypress.env("roomName"));
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Room created!");
    cy.get("body").contains(Cypress.env("roomName"));
  });

  it("add device to room sucessfully", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/rooms`);
    cy.wait(3000);
    cy.get('#add-icon').click();
    cy.get("body").contains("Add devices to room");
    cy.get(`[name="${Cypress.env("deviceName")}"]`).click();
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Devices added!");
    cy.get("body").contains(Cypress.env("deviceName"));
  });
});
