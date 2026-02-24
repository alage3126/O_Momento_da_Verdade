// fixtures/baseTest.ts
import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { LoginPage } from '../pages/LoginPage'; // Importa a nova página

// Definimos o que a nossa fixture vai conter
type MyFixtures = {
  todoPage: TodoPage;
  loginPage: LoginPage;
  
};

// Extendemos o 'test' original do Playwright
export const test = base.extend<MyFixtures>({
  todoPage: async ({ page }, use) => {
    // 1. Criamos a instância do Page Object
    const todoPage = new TodoPage(page);
    // 2. Fazemos o goto() inicial (Centralizado aqui!)
    await todoPage.goto();
    // 3. Entregamos a 'todoPage' pronta para o teste
    await use(todoPage);
    // 4. (Opcional) Limpeza após o teste
    console.log('Limpeza automática pós-teste...');
  },
  
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';