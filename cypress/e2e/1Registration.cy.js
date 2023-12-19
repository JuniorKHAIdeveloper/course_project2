describe("Registration Page", () => {
  it("account registration empty data validation", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get('[type="submit"]').click();
    cy.get("#firstName-helper-text").contains("Field is required.");
    cy.get("#lastName-helper-text").contains("Field is required.");
    cy.get("#email-helper-text").contains("Not valid email.");
    cy.get("#firstPassword-helper-text").contains("Not valid password.");
    cy.get("#secondPassword-helper-text").contains("Password mismatch.");
  });

  it("account registration fill data success", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get('[name="firstName"]').type("test");
    cy.get('[name="lastName"]').type("test");
    cy.get('[name="email"]').type("test1@test.test");
    cy.get('[name="firstPassword"]').type("testtest");
    cy.get('[name="secondPassword"]').type("testtest");
    cy.get('[type="submit"]').click();
    cy.get("body").contains("User created!");
    cy.url().then((url) => {
      expect(url).to.equal("http://localhost:3000/");
    });
  });
});
