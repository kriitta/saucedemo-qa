import { test, expect } from '@playwright/test';
import { login } from './helpers';

const SORT = '[data-test="product-sort-container"]';

async function getPrices(page: any): Promise<number[]> {
  const texts = await page.locator('.inventory_item_price').allTextContents();
  return texts.map((t: string) => parseFloat(t.replace('$', '')));
}

async function getNames(page: any): Promise<string[]> {
  return page.locator('.inventory_item_name').allTextContents();
}

test.describe('Sort', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
  });

  test('TC-008: เรียงราคาสูงไปต่ำ', async ({ page }) => {
    await page.locator(SORT).selectOption('hilo');
    const prices = await getPrices(page);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC-009: เรียงราคาต่ำไปสูง', async ({ page }) => {
    await page.locator(SORT).selectOption('lohi');
    const prices = await getPrices(page);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-010: ค่า default คือ Name (A to Z)', async ({ page }) => {
    await expect(page.locator('[data-test="active-option"]')).toHaveText('Name (A to Z)');
    const names = await getNames(page);
    expect(names).toEqual([...names].sort());
  });

  test('TC-011: เรียงชื่อ Z ไป A', async ({ page }) => {
    await page.locator(SORT).selectOption('za');
    const names = await getNames(page);
    expect(names).toEqual([...names].sort().reverse());
  });
});
