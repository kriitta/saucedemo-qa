const { Builder, By, until } = require('selenium-webdriver');

const BASE = 'https://www.saucedemo.com';
const TIMEOUT = 5000;

async function newDriver() {
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();
  if (process.env.CI) {
    options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080');
  }
  return new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

// เปิด browser ใหม่ก่อนทุกเคส ปิดหลังจบทุกเคส (ต้องเรียกภายใน describe)
function setupDriver() {
  const holder = {};
  beforeEach(async function () {
    holder.driver = await newDriver();
  });
  afterEach(async function () {
    if (!holder.driver) return;
    if (this.currentTest && this.currentTest.state === 'failed') {
      try {
        const fs = require('fs');
        fs.mkdirSync('failures', { recursive: true });
        const name = this.currentTest.title.replace(/[^\w-]+/g, '_').slice(0, 60);
        fs.writeFileSync(`failures/${name}.png`, await holder.driver.takeScreenshot(), 'base64');
        console.log('    URL ตอนล้ม:', await holder.driver.getCurrentUrl());
        console.log('    สถานะ focus ตอนล้ม:', JSON.stringify(await holder.driver.executeScript(
          'return { hasFocus: document.hasFocus(), active: document.activeElement && (document.activeElement.getAttribute("data-test") || document.activeElement.tagName) };')));
        const errs = await holder.driver.findElements(By.css('[data-test="error"]'));
        if (errs.length) console.log('    ข้อความ error บนหน้า:', await errs[0].getText());
        for (const input of await holder.driver.findElements(By.css('input'))) {
          console.log('    ช่อง', await input.getAttribute('data-test'), '=', JSON.stringify(await input.getAttribute('value')));
        }
      } catch (e) {
        // ขั้นเก็บหลักฐานต้องไม่ทำให้เทสต์พังซ้ำ
      }
    }
    await holder.driver.quit();
  });
  return holder;
}

async function waitFor(driver, css) {
  const el = await driver.wait(until.elementLocated(By.css(css)), TIMEOUT);
  await driver.wait(until.elementIsVisible(el), TIMEOUT);
  return el;
}

async function click(driver, css) {
  await driver.wait(async () => {
    try {
      const el = await driver.findElement(By.css(css));
      if (!(await el.isDisplayed())) return false;
      await el.click();
      return true;
    } catch (e) {
      if (['StaleElementReferenceError', 'NoSuchElementError', 'ElementClickInterceptedError', 'ElementNotInteractableError'].includes(e.name)) return false;
      throw e;
    }
  }, TIMEOUT, `กด ${css} ไม่สำเร็จภายในเวลาที่กำหนด`);
}

async function type(driver, css, text) {
  let last = null;
  let stage = 'ไม่เจอ element';
  try {
    await driver.wait(async () => {
      try {
        const el = await driver.findElement(By.css(css));
        if (!(await el.isDisplayed())) { stage = 'element ไม่แสดง'; return false; }
        last = await el.getAttribute('value');
        if (last === text) return true;
        if (last) await el.clear();
        await el.click();
        await driver.executeScript('arguments[0].focus();', el);
        const focused = await driver.executeScript(
          'return document.activeElement === arguments[0];', el);
        if (!focused) { stage = 'คลิกและสั่ง focus แล้วแต่ช่องไม่ได้ focus'; return false; }
        await el.sendKeys(text);
        last = await el.getAttribute('value');
        stage = 'พิมพ์แล้วแต่ค่าในช่องไม่ตรง';
        return last === text;
      } catch (e) {
        if (['StaleElementReferenceError', 'NoSuchElementError', 'ElementClickInterceptedError', 'ElementNotInteractableError'].includes(e.name)) {
          stage = 'เกิด ' + e.name;
          return false;
        }
        throw e;
      }
    }, TIMEOUT);
  } catch (e) {
    if (e.name === 'TimeoutError') {
      throw new Error(`พิมพ์ลง ${css} ไม่สำเร็จ ขั้นที่ค้าง: ${stage} (ค่าล่าสุดในช่อง: ${JSON.stringify(last)})`);
    }
    throw e;
  }
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
  By, until, newDriver, setupDriver, waitFor, click, type,
  waitForCount, waitForText, login, addBackpackAndOpenCart, fillCheckoutInfo,
};
