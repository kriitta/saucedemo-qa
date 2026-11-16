const { Builder, By, until } = require('selenium-webdriver');
const { newDriver } = require('../lib/helpers');
const assert = require('assert');

const BASE = 'https://www.saucedemo.com';
const ERROR = '[data-test="error"]';

describe('Login', function () {
  let driver;

  // เปิด browser ใหม่ทุกเคสเพื่อให้เคสแยกอิสระต่อกัน
  beforeEach(async function () {
    driver = await newDriver();
  });

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  async function login(username, password) {
    await driver.get(BASE);
    await driver.findElement(By.css('[data-test="username"]')).sendKeys(username);
    if (password) {
      await driver.findElement(By.css('[data-test="password"]')).sendKeys(password);
    }
    await driver.findElement(By.css('[data-test="login-button"]')).click();
  }

  async function getErrorText() {
    const el = await driver.wait(until.elementLocated(By.css(ERROR)), 5000);
    return el.getText();
  }

  it('TC-001: Login สำเร็จด้วย standard_user', async function () {
    await login('standard_user', 'secret_sauce');

    await driver.wait(until.urlContains('/inventory.html'), 5000);
    // Selenium ไม่ retry ให้เอง จึงรอจนสินค้าครบ 6 ชิ้นก่อน แล้วค่อยตรวจ
    await driver.wait(async () => {
      const items = await driver.findElements(By.css('.inventory_item'));
      return items.length === 6;
    }, 5000, 'สินค้าไม่ครบ 6 ชิ้นภายใน 5 วินาที');
    const items = await driver.findElements(By.css('.inventory_item'));
    assert.strictEqual(items.length, 6);
  });

  it('TC-002: locked_out_user ต้องถูกปฏิเสธ', async function () {
    await login('locked_out_user', 'secret_sauce');
    assert.ok((await getErrorText()).includes('locked out'));
  });

  it('TC-003: เว้นช่อง Password ว่าง', async function () {
    await login('standard_user', '');
    assert.ok((await getErrorText()).includes('Password is required'));
  });

  it('TC-004: username ผิด password ถูก', async function () {
    await login('wrong_user', 'secret_sauce');
    assert.ok((await getErrorText()).includes('do not match'));
  });

  it('TC-005: username ถูก password ผิด', async function () {
    await login('standard_user', 'wrong_pw');
    assert.ok((await getErrorText()).includes('do not match'));
  });
});
