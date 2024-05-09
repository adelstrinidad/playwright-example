import {Locator, Page} from '@playwright/test'
class LoginPage {
    private readonly userNameField:Locator
    private readonly passwordField:Locator
    private readonly loginButton:Locator
    private readonly loginErrorMessage:Locator
    private readonly loginCredentials:Locator
    private readonly loginCredentialsHeader:Locator

    constructor(page: Page){
        this.userNameField = page.getByRole('textbox',{name:'Username'})
        this.passwordField = page.getByRole('textbox',{name:'Password'})
        this.loginButton = page.getByRole('button',{name:'Login'})
        this.loginErrorMessage = page.locator(`h3[data-test="error"]`)
        this.loginCredentials = page.locator(`.login_credentials`)
        this.loginCredentialsHeader = page.locator(`.login_credentials h4`)
    }

    async login(username: string, password: string){
        await this.userNameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }
    async getErrorMessage(){
        return this.loginErrorMessage.innerText()
    }
    async getLoginCredentials(){
        return this.loginCredentials.innerText()
    }
    async getLoginCredentialsHeader(){
        return this.loginCredentialsHeader.innerText()
    }
}
export default LoginPage