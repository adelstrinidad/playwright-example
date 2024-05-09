import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import InventoryPage from '../pages/inventoryPage';

test.describe("Login page suite", async () => {
    test.beforeEach("Go to base URL", async ({ page }) => {
        await page.goto("/")
    })
    test("Succesfully login", async ({ page }) => {
        const username = 'standard_user'
        const password = 'secret_sauce'

        const loginPage = new LoginPage(page)
        await loginPage.login(username, password)
        const inventoryPage = new InventoryPage(page)
        await expect(await inventoryPage.getAppLogo()).toBeVisible()
    })
    const users = [{
        username: 'standard_user', password: 'invalid', error: 'Epic sadface: Username and password do not match any user in this service'
    }, { username: 'locked_out_user', password: 'secret_sauce', error: 'Epic sadface: Sorry, this user has been locked out.' }]

    users.forEach(user => {
        test(`Verify invalid users ${user.username}`, async ({ page }) => {
            const loginPage = new LoginPage(page)
            await loginPage.login(user.username, user.password)
            expect(await loginPage.getErrorMessage()).toEqual(user.error)
        })
    });
    test("Verify users section", async ({ page }) => {
        let userList = `standard_user locked_out_user problem_user performance_glitch_user error_user visual_user`
        const loginPage = new LoginPage(page)
        let users = await loginPage.getLoginCredentials()
        const header = await loginPage.getLoginCredentialsHeader();
        users = users.replace(header, '');
        users = users.replace(/\n/g, ' ');
        expect(users.trim()).toEqual(userList)
    })
})