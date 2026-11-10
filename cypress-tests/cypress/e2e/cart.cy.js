const { login } = require('../helpers');

const ADD = '[data-test="add-to-cart-sauce-labs-backpack"]';
const REMOVE = '[data-test="remove-sauce-labs-backpack"]';

describe('Cart', () => {
  beforeEach(() => {
    login('standard_user', 'secret_sauce');
  });

  it('TC-006: เพิ่มสินค้า 1 ชิ้น badge แสดง 1', () => {
    cy.get(ADD).click();

    cy.get(REMOVE).should('have.text', 'Remove');
    cy.get('.shopping_cart_badge').should('have.text', '1');

    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('contain', 'Sauce Labs Backpack');
  });

  it('TC-012: ลบสินค้าออกจากตะกร้าได้', () => {
    cy.get(ADD).click();
    cy.get('.shopping_cart_link').click();
    cy.get(REMOVE).click();

    cy.get('.cart_item').should('not.exist');
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});
