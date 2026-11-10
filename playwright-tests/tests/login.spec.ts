import { test, expect } from '@playwright/test';
import { login } from './helpers';

const ERROR = '[data-test="error"]';

test.describe('Login', () => {
  test('TC-001: Login สำเร็จด้วย standard_user', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('TC-002: locked_out_user ต้องถูกปฏิเสธ', async ({ page }) => {
    await login(page, 'locked_out_user', 'secret_sauce');
    await expect(page.locator(ERROR)).toContainText('locked out');
  });

  test('TC-003: เว้นช่อง Password ว่าง', async ({ page }) => {
    await login(page, 'standard_user', '');
    await expect(page.locator(ERROR)).toContainText('Password is required');
  });

  test('TC-004: username ผิด password ถูก', async ({ page }) => {
    await login(page, 'wrong_user', 'secret_sauce');
    await expect(page.locator(ERROR)).toContainText('do not match');
  });

  test('TC-005: username ถูก password ผิด', async ({ page }) => {
    await login(page, 'standard_user', 'wrong_pw');
    await expect(page.locator(ERROR)).toContainText('do not match');
  });
});
