import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('TC-001: Login สำเร็จด้วย standard_user', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
});
