// fixtures/baseTest.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Importa a nova página

// Definimos o que a nossa fixture vai conter
type MyFixtures = {
  loginPage: LoginPage;
  
};

// Extendemos o 'test' original do Playwright
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';