import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { InventoryPage } from './pages/inventoryPage';
import { ProductsPage } from './pages/productsPage';
import { CheckoutPage } from './pages/checkoutPage';
import Esperas from '../Utils/esperas';
import { promises as fs } from 'fs';
import path from 'path';

test.describe('Prueba - Carrito de compras', () => {
  let esperas: Esperas;
  let loginPage: LoginPage;
  let productPage: ProductsPage;
  let checkoutPage: CheckoutPage;
  let inventoryPage: InventoryPage;

  const obtenerCredenciales = async () => {
    const filePath = path.join(__dirname, '../JsonDatos/datoLogin.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  };

  test.beforeEach(async ({ page }) => {
    esperas = new Esperas(page);
    loginPage = new LoginPage(page);
    productPage = new ProductsPage(page);
    checkoutPage = new CheckoutPage(page);
    inventoryPage = new InventoryPage(page);

    await test.step('Ir a la página de inicio de sesión', async () => {
      await page.goto('https://www.saucedemo.com');
    });

    await test.step('Validar título de la página de inicio de sesión', async () => {
      await loginPage.validarTitulo();
    });

    await test.step('Completar el usuario y la contraseña', async () => {
      const credenciales = await obtenerCredenciales();
      await loginPage.completarUsuario(credenciales.data.username);
      await loginPage.completarPassword(credenciales.data.password);
    });

    await test.step('Validar y hacer clic en el botón de ingresar', async () => {
      await loginPage.validarBotonLogin();
      await loginPage.clickIngresar();
    });
  });

  test("Agregar producto al carrito",async ({page})=>{

    await test.step('Validar URL y título de la página de inventario', async () => {
      await inventoryPage.validarUrl();
      await inventoryPage.validarTitulo();
    });

    await test.step('Agregar producto al carrito', async () => {
        const botonAgregarCarrito = page.getByRole("button",{name:'Add to cart'}).first(); 
        await expect(botonAgregarCarrito).toBeEnabled(); 
        await productPage.addProductToCart();
    });

    await test.step('Ir al carrito', async () => {
      await productPage.goToCart();
    });

    await test.step('Validar que el carrito contiene al menos un producto', async () => {
      const productosEnCarrito = page.locator('.cart_list .cart_item'); 
      const count = await productosEnCarrito.count();  
      expect(count).toBeGreaterThan(0);
    });

  })

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});