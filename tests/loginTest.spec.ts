import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import Esperas from '../Utils/esperas';
import { promises as fs } from 'fs';
import path from 'path';

test.describe('Prueba - Login', () => {
  let esperas: Esperas;
  let loginPage: LoginPage;

  const obtenerCredenciales = async () => {
    const filePath = path.join(__dirname, '../JsonDatos/datoLogin.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  };

  test.beforeEach(async ({ page }) => {
    esperas = new Esperas(page);
    loginPage = new LoginPage(page);
  });

  test("Realiza login con credenciales validas",async ({page})=>{

    await test.step('Ir a la página de inicio de sesión', async () => {
        await page.goto('https://www.saucedemo.com');
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

    await test.step('Validar ingreso', async () => {
        await loginPage.validarTituloHome();
    });

  })

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});