import { test, expect } from '@playwright/test';
import { login } from './helpers';

test.describe('Session & Navigation', () => {
  test('TC-020: Logout แล้วกลับหน้า login', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('TC-021: เข้า /inventory.html โดยไม่ login ต้องถูกปฏิเสธ', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page.locator('[data-test="error"]')).toContainText('only access');
    await expect(page.locator('.inventory_item')).toHaveCount(0);
  });

  test('TC-022: รายการสินค้าครบ 6 ชิ้น มีชื่อ ราคา รูป', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.inventory_item_name')).toHaveCount(6);
    await expect(page.locator('.inventory_item_price')).toHaveCount(6);
    await expect(page.locator('.inventory_item_img img')).toHaveCount(6);
  });
});
