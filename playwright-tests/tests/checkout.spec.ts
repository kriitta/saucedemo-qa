import { test, expect } from '@playwright/test';
import { login, addBackpackAndOpenCart, fillCheckoutInfo } from './helpers';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await addBackpackAndOpenCart(page);
  });

  test('TC-016: กรอกข้อมูลครบแล้วไปหน้า Overview ได้', async ({ page }) => {
    await fillCheckoutInfo(page, 'Krittapas', 'Wannawilai', '10220');

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  });

  test('TC-017: เว้น Last Name ต้องแสดง error', async ({ page }) => {
    await fillCheckoutInfo(page, 'Krittapas', '', '10220');

    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test('TC-018: กด Cancel กลับ Cart สินค้ายังอยู่', async ({ page }) => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('TC-019: Finish แล้วแสดงหน้ายืนยันและตะกร้าถูกล้าง', async ({ page }) => {
    await fillCheckoutInfo(page, 'Krittapas', 'Wannawilai', '10220');
    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
  });
});
