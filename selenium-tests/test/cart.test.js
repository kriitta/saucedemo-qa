const {
  setupDriver, click, login, waitForCount, waitForText, addBackpackAndOpenCart,
} = require('../lib/helpers');

const ADD = '[data-test="add-to-cart-sauce-labs-backpack"]';
const REMOVE = '[data-test="remove-sauce-labs-backpack"]';
const BADGE = '.shopping_cart_badge';

describe('Cart', function () {
  const s = setupDriver();

  beforeEach(async function () {
    await login(s.driver, 'standard_user', 'secret_sauce');
  });

  it('TC-006: เพิ่มสินค้า 1 ชิ้น badge แสดง 1', async function () {
    await click(s.driver, ADD);
    await waitForText(s.driver, REMOVE, 'Remove');
    await waitForText(s.driver, BADGE, '1');

    await click(s.driver, '.shopping_cart_link');
    await waitForText(s.driver, '.cart_item', 'Sauce Labs Backpack', true);
  });

  it('TC-012: ลบสินค้าออกจากตะกร้าได้', async function () {
    await addBackpackAndOpenCart(s.driver);
    await click(s.driver, REMOVE);

    await waitForCount(s.driver, '.cart_item', 0);
    await waitForCount(s.driver, BADGE, 0);
  });
});
