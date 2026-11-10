import { test, expect } from '@playwright/test';
import { login } from './helpers';

const ADD = '[data-test="add-to-cart-sauce-labs-backpack"]';
const REMOVE = '[data-test="remove-sauce-labs-backpack"]';

test.describe('Known bugs (expected to fail until fixed)', () => {
  test('TC-007 / BUG-001: problem_user เห็นรูปสินค้าไม่ซ้ำกัน', async ({ page }) => {
    test.fail(true, 'BUG-001: รูปสินค้าทุกชิ้นเป็นรูปเดียวกัน');

    await login(page, 'problem_user', 'secret_sauce');
    const srcs = await page.locator('.inventory_item_img img').evaluateAll(
      (imgs) => imgs.map((i) => (i as HTMLImageElement).src)
    );

    expect(new Set(srcs).size).toBe(6);
  });

  test('TC-013 / BUG-002: error_user กด Remove ในหน้า Products แล้วสินค้าถูกลบ', async ({ page }) => {
    test.fail(true, 'BUG-002: ปุ่ม Remove ในหน้า Products ไม่ทำงาน');

    await login(page, 'error_user', 'secret_sauce');
    await page.locator(ADD).click();
    await page.locator(REMOVE).click();

    await expect(page.locator(ADD)).toBeVisible();
  });
});

test.describe('error_user: ส่วนที่ทำงานปกติ', () => {
  test('TC-023: error_user ลบสินค้าในหน้า Cart ได้ (workaround ของ BUG-002)', async ({ page }) => {
    await login(page, 'error_user', 'secret_sauce');
    await page.locator(ADD).click();
    await page.locator('.shopping_cart_link').click();
    await page.locator(REMOVE).click();

    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
