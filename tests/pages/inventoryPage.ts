import {Locator, Page} from '@playwright/test'
class InventoryPage {
    private readonly appLogo:Locator


    constructor(page: Page){
        this.appLogo = page.locator('.app_logo')
    }
    async getAppLogo(){
        return await this.appLogo
    }
}
export default InventoryPage