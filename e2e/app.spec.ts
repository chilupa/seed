import { expect, test } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/Build once, ship everywhere/i)).toBeVisible();
});
