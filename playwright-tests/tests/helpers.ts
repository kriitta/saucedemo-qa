import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

export async function addBackpackAndOpenCart(page: Page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
}

export async function fillCheckoutInfo(
  page: Page,
  first: string,
  last: string,
  zip: string
) {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill(first);
  if (last) await page.locator('[data-test="lastName"]').fill(last);
  await page.locator('[data-test="postalCode"]').fill(zip);
  await page.locator('[data-test="continue"]').click();
}
