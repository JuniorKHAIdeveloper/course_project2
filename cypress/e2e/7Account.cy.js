describe("Account Page", () => {
  beforeEach(() => {
    cy.readFile("./token.txt").then((jwttoken) => {
      cy.setCookie("jwttoken", jwttoken);
    });
  });

  it("check profile form validation", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/account`);
    cy.get('[name="firstName"]').should('have.value', 'test');
    cy.get('[name="lastName"]').should('have.value', 'test');
    cy.get('[name="email"]').should('have.value', 'test@test.test');
    cy.get('[name="firstName"]').invoke('val', '');
    cy.get('[name="lastName"]').invoke('val', '');
    cy.get('[name="email"]').invoke('val', '');
    cy.get('#submit-profile').click();
    cy.get("body").contains("Field is required.");
    cy.get("body").contains("Not valid email.");
  });

  it("check profile change credentials success", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/account`);
    cy.get('[name="firstName"]').should('have.value', 'test');
    cy.get('[name="lastName"]').should('have.value', 'test');
    cy.get('[name="email"]').should('have.value', 'test@test.test');
    cy.get('[name="firstName"]').invoke('val', 'test1');
    cy.get('[name="lastName"]').invoke('val', 'test1');
    cy.get('[name="email"]').invoke('val', 'test1@test.test');
    cy.get("body").should('not.contain', 'Field is required.');
    cy.get("body").should('not.contain', 'Not valid email.');
    cy.get('#submit-profile').click();
    cy.get("body").contains("User is updated!");
    cy.get('[name="firstName"]').should('have.value', 'test1');
    cy.get('[name="lastName"]').should('have.value', 'test1');
    cy.get('[name="email"]').should('have.value', 'test1@test.test');
  });

    it("check security form validation", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/account`);
    cy.get('[name="currentPassword"]').should('have.value', '');
    cy.get('[name="newPassword"]').should('have.value', '');
    cy.get('[name="confirmPassword"]').should('have.value', '');
    cy.get('#submit-security').click();
    cy.get("body").contains("Not valid password.");
    cy.get("body").contains("Password mismatch.");
  });

  it("check security change credentials success", () => {
    cy.visit(`${Cypress.env("host")}/dashboard/account`);
    cy.get('[name="currentPassword"]').should('have.value', '');
    cy.get('[name="newPassword"]').should('have.value', '');
    cy.get('[name="confirmPassword"]').should('have.value', '');
    cy.get('[name="currentPassword"]').invoke('val', Cypress.env('password'));
    cy.get('[name="newPassword"]').invoke('val', Cypress.env('newPassword'));
    cy.get('[name="confirmPassword"]').invoke('val', Cypress.env('newPassword'));
    cy.get('#submit-security').click();
    cy.get("body").should('not.contain', 'Field is required.');
    cy.get("body").should('not.contain', 'Password mismatch.');
    cy.get("body").contains("Password is updated!");
    cy.getCookie('jwttoken').then((cookie) => {
      if (cookie) {
        cy.writeFile('./token.txt', cookie.value)
      }
    });
  });
});
