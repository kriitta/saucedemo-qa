const assert = require('assert');
const {
  setupDriver, until, click, login, waitFor, waitForCount, waitForText,
  addBackpackAndOpenCart, fillCheckoutInfo,
} = require('../lib/helpers');

describe('Checkout', function () {
  const s = setupDriver();

  beforeEach(async function () {
    await login(s.driver, 'standard_user', 'secret_sauce');
    await addBackpackAndOpenCart(s.driver);
  });

  it('TC-016: กรอกข้อมูลครบแล้วไปหน้า Overview ได้', async function () {
    await fillCheckoutInfo(s.driver, 'Krittapas', 'Wannawilai', '10220');

    await s.driver.wait(until.urlContains('/checkout-step-two.html'), 5000);
    await waitForText(s.driver, '.inventory_item_name', 'Sauce Labs Backpack');
    await waitFor(s.driver, '[data-test="total-label"]');
  });

  it('TC-017: เว้น Last Name ต้องแสดง error', async function () {
    await fillCheckoutInfo(s.driver, 'Krittapas', '', '10220');

    await waitForText(s.driver, '[data-test="error"]', 'Last Name is required', true);
    const url = await s.driver.getCurrentUrl();
    assert.ok(url.includes('/checkout-step-one.html'));
  });

  it('TC-019: Finish แล้วแสดงหน้ายืนยันและตะกร้าถูกล้าง', async function () {
    await fillCheckoutInfo(s.driver, 'Krittapas', 'Wannawilai', '10220');
    await click(s.driver, '[data-test="finish"]');

    await waitForText(s.driver, '[data-test="complete-header"]', 'Thank you for your order!');
    await waitForCount(s.driver, '.shopping_cart_badge', 0);
    await waitFor(s.driver, '[data-test="back-to-products"]');
  });
});
