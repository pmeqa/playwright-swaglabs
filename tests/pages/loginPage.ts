import { Locator, Page, expect } from "@playwright/test";
import Assert from "../../Utils/assert";

export class LoginPage {
    private readonly page: Page;
    private readonly assert: Assert;
    private readonly titulo: Locator;
    private readonly usuarioInput: Locator;
    private readonly passwordInput: Locator;
    private readonly botonIngresar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.assert = new Assert(page);
        this.titulo = this.page.getByText('Swag Labs' );
        this.usuarioInput = page.getByRole('textbox', { name: 'Username' }); 
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.botonIngresar = page.getByRole('button', { name: 'Login' });
    }

    async validarTitulo() {
        await this.assert.assertElementoEsONoVisible(this.titulo, true);
    }

    async validarTituloHome() {
        await expect(this.titulo).toHaveText('Swag Labs');
    }

    async completarUsuario(user: string) {
        await this.assert.assertElementoEsONoVisible(this.usuarioInput, true);
        await this.usuarioInput.fill(user);
    }

    async completarPassword(password: string) {
        await this.assert.assertElementoEsONoVisible(this.passwordInput, true);
        await this.passwordInput.fill(password);
    }

    async validarBotonLogin() {
        await this.assert.assertElementoEsONoVisible(this.botonIngresar, true);
    }

    async clickIngresar() {
        await this.assert.validarElementoVisibleYDisponible(this.botonIngresar)
        await this.botonIngresar.click();
    }
}