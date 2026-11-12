const { Select } = require('selenium-webdriver/lib/select');
const { By, setupDriver, waitFor, login } = require('../lib/helpers');

describe('Sort', function () {
  const s = setupDriver();

  beforeEach(async function () {
    await login(s.driver, 'standard_user', 'secret_sauce');
  });

  it('TC-008: เรียงราคาสูงไปต่ำ', async function () {
    const dropdown = await waitFor(s.driver, '[data-test="product-sort-container"]');
    await new Select(dropdown).selectByValue('hilo');

    // ลูปรอเอง เทียบกับ Cypress .should(callback) ที่ retry ให้อัตโนมัติ
    await s.driver.wait(async () => {
      try {
        const els = await s.driver.findElements(By.css('.inventory_item_price'));
        const texts = await Promise.all(els.map((e) => e.getText()));
        const prices = texts.map((t) => parseFloat(t.replace('$', '')));
        const expected = [...prices].sort((a, b) => b - a);
        return prices.length === 6 && prices.every((p, i) => p === expected[i]);
      } catch (e) {
        return false;
      }
    }, 5000, 'ราคายังไม่เรียงจากมากไปน้อย');
  });
});
