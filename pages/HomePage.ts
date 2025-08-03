import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly categories: Locator;
  readonly productCards: Locator;
  readonly nextPageLink: Locator;

  constructor(page: Page) {
    super(page);
    this.categories = page.locator('.list-group .list-group-item');
    this.productCards = page.locator('.card .card-title');
    this.nextPageLink = page.locator('#next2');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.demoblaze.com');
  }

  async filterByCategory(name: string): Promise<void> {
    await this.categories.filter({ hasText: name }).click();
    await this.productCards.first().waitFor({ state: 'visible' });
  }

  async selectProduct(title: string): Promise<void> {
    await this.productCards.filter({ hasText: title }).click();
  }
};
