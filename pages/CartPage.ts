import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartLink: Locator;
  readonly deleteButtons: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.cartLink = page.locator('#cartur');
    this.deleteButtons = page.getByRole('link', { name: 'Delete' });
    this.totalPrice = page.locator('#totalp');
  }

  async openCart(): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**/cart.html'),
      this.cartLink.click(),
    ]);
    await this.totalPrice.waitFor({ state: 'visible' });
  }

  async removeProduct(title: string): Promise<void> {
    const row = this.page.locator('tr').filter({ hasText: title });
    await row.getByRole('link', { name: 'Delete' }).click();
    await row.waitFor({ state: 'detached' });
    await this.page.waitForTimeout(500);
  }

  async getTotal(): Promise<string | null> {
    return (await this.totalPrice.textContent())?.trim() || '0';
  }

  async clearCart(): Promise<void> {
    while (true) {
      const rows = this.page.locator('tr td:nth-child(2)');
      const count = await rows.count();
      if (count === 0) break;

      const title = (await rows.first().textContent())?.trim() || '';
      if (!title) break;

      await this.removeProduct(title);
      await this.page.waitForTimeout(300);
    }
  }
}
