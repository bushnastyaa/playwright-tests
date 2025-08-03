import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart functionality', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await homePage.goto();
  });

  test('Add product to cart updates total', async () => {
    await homePage.selectProduct('Samsung galaxy s6');
    await productPage.addToCart();

    await cartPage.openCart();
    expect(await cartPage.getTotal()).toBe('360');
  });

  test('Remove product from cart clears total', async () => {
    await homePage.selectProduct('Samsung galaxy s6');
    await productPage.addToCart();

    await cartPage.openCart();
    await cartPage.removeProduct('Samsung galaxy s6');
    expect(await cartPage.getTotal()).toBe('0');
  });

  test('Clear cart removes all products and resets total', async () => {
    await homePage.selectProduct('Samsung galaxy s6');
    await productPage.addToCart();
    await homePage.goto();
    await homePage.selectProduct('Nokia lumia 1520');
    await productPage.addToCart();

    await cartPage.openCart();
    await cartPage.clearCart();

    expect(await cartPage.getTotal()).toBe('0');
  });
});
