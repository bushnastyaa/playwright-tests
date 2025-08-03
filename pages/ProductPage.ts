import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly addToCartLink: Locator;
  readonly titleHeading: Locator;
  readonly priceText: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartLink = page.getByRole('link', { name: 'Add to cart' });
    this.titleHeading = page.getByRole('heading', { level: 2 });
    this.priceText = page.getByText(/^\$\d+/);
  }

  async addToCart(): Promise<void> {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.addToCartLink.click()
    ]);
    await dialog.accept();
  }

  async getTitle(): Promise<string | null> {
    return this.titleHeading.textContent();
  }

  async getPrice(): Promise<string | null> {
    return this.priceText.textContent();
  }
}
