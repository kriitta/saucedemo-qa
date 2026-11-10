const ERROR = '[data-test="error"]';

function login(username, password) {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  if (password) cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
}

describe('Login', () => {
  it('TC-001: Login สำเร็จด้วย standard_user', () => {
    login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('TC-002: locked_out_user ต้องถูกปฏิเสธ', () => {
    login('locked_out_user', 'secret_sauce');
    cy.get(ERROR).should('contain', 'locked out');
  });

  it('TC-003: เว้นช่อง Password ว่าง', () => {
    login('standard_user', '');
    cy.get(ERROR).should('contain', 'Password is required');
  });

  it('TC-004: username ผิด password ถูก', () => {
    login('wrong_user', 'secret_sauce');
    cy.get(ERROR).should('contain', 'do not match');
  });

  it('TC-005: username ถูก password ผิด', () => {
    login('standard_user', 'wrong_pw');
    cy.get(ERROR).should('contain', 'do not match');
  });
});
