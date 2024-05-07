import { test, expect } from '@playwright/test';
import LoginPage from './pages/loginPage';

test.describe("Login suite", async () => {
    test("Succesfully login", async ({ page }) => {
        await page.goto("https://saucedemo.com")
        const loginPage = new LoginPage(page)
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(page.locator(".app_logo")).toBeVisible()
    })
    const users = [{
        username: 'standard_user', password: 'invalid', error: 'Epic sadface: Username and password do not match any user in this service'
    }, { username: 'locked_out_user', password: 'secret_sauce', error: 'Epic sadface: Sorry, this user has been locked out.' }]
    
    users.forEach(user => {
        test(`Verify invalid users ${user.username}`, async ({ page }) => {
            await page.goto("https://saucedemo.com")

            const loginPage = new LoginPage(page)
            await loginPage.login(user.username, user.password)
            expect(await loginPage.getErrorMessage()).toEqual(user.error)
        })
    });
})