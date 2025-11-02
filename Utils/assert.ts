import { expect, Locator, Page } from "@playwright/test";

export default class Assert {

    constructor(private page: Page) { }


    async assertTitulo(titulo: string) {
        await expect(this.page).toHaveTitle(titulo);
    }

    async assertTituloContiene(titulo: string) {
        const pageTitulo = await this.page.title();
        expect(pageTitulo).toContain(titulo);
    }

    async assertURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContiene(titulo: string) {
        const pageURL = this.page.url();
        expect(pageURL).toContain(titulo);
    }

    async assertElementoExiste(elemento: Locator){
        expect(elemento).not.toBeNull();
    }

    async assertElementoEsONoVisible(elemento: Locator, esperado: Boolean){
        expect(await elemento.isVisible()).toBe(esperado);
    }


    async assertElementoEstaHabilitado(elemento: Locator){
        expect(await elemento.isEnabled).toBe(true);
    }

    async validarElementoVisibleYDisponible(elemento: Locator){
        // Comprobar si el elemento está visible
    if (!elemento.boundingBox) {
        throw new Error(`El elemento ${elemento.getByRole}: ${elemento.getAttribute("name")} no está visible`);
      }
    
      // Comprobar si el elemento está operativo
      if (!elemento.isEnabled()) {
        throw new Error(`El elemento ${elemento.getByRole}: ${elemento.getAttribute("name")} no está operativo`);
      }
    }


    /* //assert APIResponseAssertions
    async otro(response: Response){
        await expect(response).toBeOK();
    } */

}