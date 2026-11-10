function login(username, password) {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  if (password) cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
}

function addBackpackAndOpenCart() {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  cy.get('.shopping_cart_link').click();
}

function fillCheckoutInfo(first, last, zip) {
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type(first);
  if (last) cy.get('[data-test="lastName"]').type(last);
  cy.get('[data-test="postalCode"]').type(zip);
  cy.get('[data-test="continue"]').click();
}

module.exports = { login, addBackpackAndOpenCart, fillCheckoutInfo };
