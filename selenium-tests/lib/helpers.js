const { Builder, By, until } = require('selenium-webdriver');

const BASE = 'https://www.saucedemo.com';
const TIMEOUT = 5000;

async function newDriver() {
  return new Builder().forBrowser('chrome').build();
}

// เปิด browser ใหม่ก่อนทุกเคส ปิดหลังจบทุกเคส (ต้องเรียกภายใน describe)
function setupDriver() {
  const holder = {};
  beforeEach(async function () {
    holder.driver = await newDriver();
  });
  afterEach(async function () {
    if (holder.driver) await holder.driver.quit();
  });
  return holder;
}

async function waitFor(driver, css) {
  const el = await driver.wait(until.elementLocated(By.css(css)), TIMEOUT);
  await driver.wait(until.elementIsVisible(el), TIMEOUT);
  return el;
}

async function click(driver, css) {
  const el = await waitFor(driver, css);
  await el.click();
}

async function type(driver, css, text) {
  const el = await waitFor(driver, css);
  await el.sendKeys(text);
}

// Selenium ไม่ retry ให้เอง จึงต้องเขียนลูปรอเองทุกครั้งที่ตรวจค่าที่อาจยังไม่พร้อม
async function waitForCount(driver, css, expected) {
  await driver.wait(async () => {
    const els = await driver.findElements(By.css(css));
    return els.length === expected;
  }, TIMEOUT, `คาดว่า ${css} จะมี ${expected} รายการ`);
}

async function waitForText(driver, css, expected, contains = false) {
  await driver.wait(async () => {
    try {
      const els = await driver.findElements(By.css(css));
      if (els.length === 0) return false;
      const text = await els[0].getText();
      return contains ? text.includes(expected) : text === expected;
    } catch (e) {
      return false; // element เปลี่ยนระหว่างอ่าน ให้ลองใหม่
    }
  }, TIMEOUT, `ข้อความของ ${css} ไม่เป็น "${expected}"`);
}

async function login(driver, username, password) {
  await driver.get(BASE);
  await type(driver, '[data-test="username"]', username);
  if (password) await type(driver, '[data-test="password"]', password);
  await click(driver, '[data-test="login-button"]');
}

async function addBackpackAndOpenCart(driver) {
  await click(driver, '[data-test="add-to-cart-sauce-labs-backpack"]');
  await click(driver, '.shopping_cart_link');
}

async function fillCheckoutInfo(driver, first, last, zip) {
  await click(driver, '[data-test="checkout"]');
  await type(driver, '[data-test="firstName"]', first);
  if (last) await type(driver, '[data-test="lastName"]', last);
  await type(driver, '[data-test="postalCode"]', zip);
  await click(driver, '[data-test="continue"]');
}

module.exports = {
  By, until, setupDriver, waitFor, click, type,
  waitForCount, waitForText, login, addBackpackAndOpenCart, fillCheckoutInfo,
};
