# playwright-swaglabs - Playwright con TypeScript

**playwright-swaglabs** es un entorno de pruebas automatizadas end-to-end (E2E) desarrollado con **Playwright** y **TypeScript**, diseñado específicamente para validar la funcionalidad, la estabilidad y el rendimiento de la aplicación web **Swag Labs**.  
Este proyecto permite ejecutar pruebas reproducibles, escalables y fácilmente mantenibles para garantizar la calidad del sitio en distintos navegadores y entornos.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js)
- **Visual Studio Code** o cualquier editor compatible con TypeScript

---

## Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/pmeqa/playwright-swaglabs.git
   cd playwright-saucelabs
Instalar las dependencias del proyecto:

    npx playwright install

Ejecución de Pruebas
Ejecutar todas las pruebas


    npx playwright test
Ejecutar un archivo de prueba específico


    npx playwright test nombre-de-archivo.spec.ts
Ejecutar las pruebas con interfaz interactiva

    npx playwright test --ui
Generar y visualizar el reporte de resultados

    npx playwright show-report
Estructura del Proyecto

```
playwright-swaglabs/

├── .github/ # Configuración de flujos de trabajo de GitHub
│ └── workflows/ # Configuración para CI/CD
│ └── webpack.yml 
├── JsonDatos/ # Carpeta que contiene los datos JSON
│ └── datoLogin.json.txt 
├── tests/ # Carpeta principal que contiene las pruebas
│ ├── pageSteps/ # Páginas de prueba
│ │ ├── checkoutPage.ts 
│ │ ├── inventoryPage.ts 
│ │ ├── loginPage.ts 
│ │ └── productsPage.ts 
│ ├── loginTest.spec.ts 
│ └── checkoutTest.spec.ts 
│ └── cartTest.spec.ts 
├── Utils/ # Utilidades compartidas entre pruebas
│ ├── assert.ts 
│ └── esperas.ts 
├── .gitignore 
├── package-lock.json 
├── package.json # Configuración de dependencias y scripts
├── playwright.config.ts # Configuración de Playwright
├── playwright configuración necesaria.jpg # configuración adicional de Playwright
└── README.md

```
Scripts Recomendados

Para facilitar la ejecución, se recomienda agregar los siguientes scripts en el archivo package.json:

```
"scripts": {
  "test": "npx playwright test",
  "test:ui": "npx playwright test --ui",
  "report": "npx playwright show-report"
}
```

Así podrás ejecutar los comandos de forma más simple:


```
npm run test
npm run test:ui
npm run report
```

Ejemplo de Prueba:

```
import { test, expect } from '@playwright/test';

test('Validar inicio de sesión exitoso en Swag Labs', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
});
```
### Consejos:
Mantener las pruebas independientes entre sí.
Configurar variables de entorno sensibles (como credenciales) en archivos .env.

### Contribución
Si deseas mejorar o ampliar las pruebas, crea una nueva rama y envía un pull request con tus cambios.
Por favor, sigue las buenas prácticas de codificación y mantén la consistencia en el estilo del código y las pruebas.

### Este proyecto es mantenido por:
- [pmeqa](https://github.com/pmeqa)