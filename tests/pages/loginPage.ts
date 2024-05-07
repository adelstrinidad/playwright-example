import {Locator, Page} from '@playwright/test'
class LoginPage {
    private readonly userNameField:Locator
    private readonly passwordField:Locator
    private readonly loginButton:Locator
    private readonly loginErrorMessage:Locator

    constructor(page: Page){
        this.userNameField = page.getByRole('textbox',{name:'Username'})
        this.passwordField = page.getByRole('textbox',{name:'Password'})
        this.loginButton = page.getByRole('button',{name:'Login'})
        this.loginErrorMessage = page.locator(`h3[data-test="error"]`)
    }

    async login(username: string, password: string){
        await this.userNameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }
    async getErrorMessage(){
        await this.loginErrorMessage.innerText()
        return await this.loginErrorMessage.innerText()
    }
}
export default LoginPage