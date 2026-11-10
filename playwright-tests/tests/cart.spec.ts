import { test, expect } from '@playwright/test';
import { login } from './helpers';

const ADD_BACKPACK = '[data-test="add-to-cart-sauce-labs-backpack"]';
const REMOVE_BACKPACK = '[data-test="remove-sauce-labs-backpack"]';
const BADGE = '.shopping_cart_badge';
const CART_LINK = '.shopping_cart_link';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
  });

  test('TC-006: เพิ่มสินค้า 1 ชิ้น badge แสดง 1', async ({ page }) => {
    await page.locator(ADD_BACKPACK).click();

    await expect(page.locator(REMOVE_BACKPACK)).toHaveText('Remove');
    await expect(page.locator(BADGE)).toHaveText('1');

    await page.locator(CART_LINK).click();
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });

  test('TC-012: ลบสินค้าออกจากตะกร้าได้', async ({ page }) => {
    await page.locator(ADD_BACKPACK).click();
    await page.locator(CART_LINK).click();
    await page.locator(REMOVE_BACKPACK).click();

    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator(BADGE)).toHaveCount(0);
  });

  test('TC-014: เพิ่มสินค้า 3 ชิ้น badge แสดง 3', async ({ page }) => {
    await page.locator(ADD_BACKPACK).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    await expect(page.locator(BADGE)).toHaveText('3');
  });

  test('TC-015: ตะกร้าว่างไม่มี error', async ({ page }) => {
    await page.locator(CART_LINK).click();

    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
