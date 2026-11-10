const { login, addBackpackAndOpenCart, fillCheckoutInfo } = require('../helpers');

describe('Checkout', () => {
  beforeEach(() => {
    login('standard_user', 'secret_sauce');
    addBackpackAndOpenCart();
  });

  it('TC-016: กรอกข้อมูลครบแล้วไปหน้า Overview ได้', () => {
    fillCheckoutInfo('Krittapas', 'Wannawilai', '10220');

    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack');
    cy.get('[data-test="total-label"]').should('be.visible');
  });

  it('TC-017: เว้น Last Name ต้องแสดง error', () => {
    fillCheckoutInfo('Krittapas', '', '10220');

    cy.get('[data-test="error"]').should('contain', 'Last Name is required');
    cy.url().should('include', '/checkout-step-one.html');
  });

  it('TC-019: Finish แล้วแสดงหน้ายืนยันและตะกร้าถูกล้าง', () => {
    fillCheckoutInfo('Krittapas', 'Wannawilai', '10220');
    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    cy.get('.shopping_cart_badge').should('not.exist');
    cy.get('[data-test="back-to-products"]').should('be.visible');
  });
});
