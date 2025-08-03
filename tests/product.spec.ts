import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Product page functionality', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.goto();

    await homePage.selectProduct('Samsung galaxy s6');
  });

  test('Title and price are displayed correctly', async () => {
    const title = await productPage.getTitle();
    const price = await productPage.getPrice();

    expect(title).toBe('Samsung galaxy s6');
    expect(price).toMatch(/\$?\s*360/);
  });

  test('Add to cart updates cart total', async () => {
    await productPage.addToCart();

    await cartPage.openCart();

    expect(await cartPage.getTotal()).toMatch(/360/);
  });

  test('Add multiple products accumulates total', async () => {
    await productPage.addToCart();
    await homePage.goto();
    await homePage.selectProduct('Samsung galaxy s6');
    await productPage.addToCart();

    await cartPage.openCart();

    expect(await cartPage.getTotal()).toMatch(/720/);
  });
});
