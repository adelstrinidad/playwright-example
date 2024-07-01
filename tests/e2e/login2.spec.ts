import { expect, test } from '@playwright/test';

import InventoryPage from '../pages/inventoryPage';
import LoginPage from '../pages/loginPage';
import exp from 'constants';

test.describe("Login page suite", async () => {
    test.beforeEach("Go to base URL", async ({ page }) => {
        await page.goto("https://saucedemo.com")
    })
    test("Succesfully login no page object", async ({ page }) => {
        const username = 'standard_user'
        const password = 'secret_sauce'

        await page.getByRole('textbox',{name:'Username'}).fill('standard_user')
        await page.locator('#password').fill('secret_sauce')
        await page.getByText('Login').click()

        const logo = page.locator('.app_logo')
        await expect(logo).toBeVisible()

        //click on the second add to cart button
        const itemName = await page.getByText('Sauce Labs Bike Light').textContent()
        await page.getByRole('button',{name:'Add to cart'}).nth(1).click()
        // await page.getByRole('button',{name:'Add to cart'}).first().click()
        await expect(page.getByRole('button',{name:'Remove'})).toBeVisible()
        await expect(logo).toBeVisible()
        
        await page.locator('.shopping_cart_link').click()
        //validate checkout is visible and continue
        await expect(page.getByRole('button',{name:'Checkout'})).toBeVisible()
        await page.getByRole('button',{name:'Checkout'}).click()

        //complete checkout
        await page.getByRole('textbox',{name:'First Name'}).fill('test')
        await page.getByRole('textbox',{name:'Last Name'}).fill('test')
        await page.getByRole('textbox',{name:'Zip/Postal Code'}).fill('test')
        await page.getByRole('button',{name:'Continue'}).click()

        // verify checkout overview
        await expect(page.getByText('Checkout: Overview')).toBeVisible()
        await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible()
        await page.getByRole('button',{name:'Finish'}).click()
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!')


        
    })
})

test.describe.only('test suite name', async()=>{
    test.beforeEach("go to url", async({page})=>{
        await page.goto("https://saucedemo.com")
    })

    test("Checkout flow", async({page})=>{
        console.log("opening the browser")
        await page.getByRole("textbox",{name:"Username"}).fill("standard_user")
        await page.getByRole("textbox",{name:"Password"}).fill("secret_sauce")
        await page.getByRole("button",{name:"Login"}).click()

        await expect(page.locator(".app_logo")).toBeVisible()
        await page.getByRole("button",{name:"Add to cart"}).first().click()
        await page.locator(".shopping_cart_badge").click()

        await expect(page.getByText("Sauce Labs Backpack")).toBeVisible()
        await page.getByRole("button",{name:"Checkout"}).click()

        await expect(await page.locator(".title").textContent()).toBe('Checkout: Your Information')
        // complete checkout
        await page.getByRole("textbox",{name:"First Name"}).fill("My name")
        await page.getByRole("textbox",{name:"Last Name"}).fill("My last name")
        await page.getByRole("textbox",{name:"Zip"}).fill("10001")
        await page.getByRole("button",{name:"Continue"}).click()

        // Verify checkout
        await expect(await page.locator(".title").textContent()).toBe('Checkout: Overview')
        await expect(page.getByText("Sauce Labs Backpack")).toBeVisible()
        await page.getByRole("button",{name:"Finish"}).click()

        // Verify Checkout complete
        await expect(await page.locator(".title").textContent()).toBe('Checkout: Complete!')
        await expect(await page.locator(".complete-header").textContent()).toBe('Thank you for your order!')
        await page.screenshot()

    })
})