import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Home page functionality', () => {
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.goto();
  });

  test('Filter by category "Phones" shows phone items', async () => {
    await homePage.filterByCategory('Phones');

    const items = await homePage.productCards.allTextContents();
    expect(items.length).toBeGreaterThan(0);
    expect(items).toContain('Samsung galaxy s6');
  });

  test('Selecting a product navigates to its detail page', async () => {
    const productName = 'Samsung galaxy s6';

    await homePage.selectProduct(productName);

    const title = await productPage.getTitle();
    expect(title).toBe(productName);
  });
});
