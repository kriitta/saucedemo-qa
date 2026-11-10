const { login } = require('../helpers');

describe('Sort', () => {
  beforeEach(() => {
    login('standard_user', 'secret_sauce');
  });

  it('TC-008: เรียงราคาสูงไปต่ำ', () => {
    cy.get('[data-test="product-sort-container"]').select('hilo');

    cy.get('.inventory_item_price').should(($els) => {
      const prices = [...$els].map((el) => parseFloat(el.innerText.replace('$', '')));
      const expected = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(expected);
    });
  });
});
