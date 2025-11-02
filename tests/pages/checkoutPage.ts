import { expect, Page, Locator } from '@playwright/test';

export class CheckoutPage {
    private checkOutBtn: Locator;
    private firstName: Locator;
    private lastName: Locator;
    private zipCode: Locator;
    private continueBtn: Locator;
    private finishBtn: Locator;
    private completeOrderMessage: Locator;

    constructor(page: Page) {
        this.checkOutBtn = page.getByText('Checkout');
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueBtn = page.getByText('Continue');
        this.finishBtn = page.getByText('Finish');
        this.completeOrderMessage = page.locator('.complete-header');
    }

    async checkOut() {
        await this.checkOutBtn.click();
    }

    async fillInformationForm() {
        await this.firstName.fill('asdad');
        await this.lastName.fill('asdasd');
        await this.zipCode.fill('123');
        await this.continueBtn.click();
    }

    async finishCheckOut() {
        await this.finishBtn.click();
    }

    async validateSuccessMessage() {
        await expect(this.completeOrderMessage).toBeVisible();
    }
}