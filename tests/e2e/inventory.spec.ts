import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/inventoryPage';

test.describe("Login page suite", async () => {
    test.beforeEach("Login using cookies, and go to Inventory page", async ({ page }) => {
        await page.goto("/")
        const cookie = {
            name: 'session-username',
            value: 'standard_user',
            domain: 'www.saucedemo.com',
            path: '/',
            expires: Date.now() / 1000 + 10000,
        }
        await page.context().addCookies([cookie])
        await page.goto("/inventory.html")
    })
    test("Succesfully login", async ({ page }) => {
        const inventoryPage = new InventoryPage(page)
        await expect(await inventoryPage.getAppLogo()).toBeVisible()
    })
})