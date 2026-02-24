import { test, expect } from '@playwright/test';

test.describe('Testes de API Mocking', () => {
  
  test('deve mostrar lista vazia quando a API falha', async ({ page }) => {
    // Simulamos um erro de servidor (500)
    await page.route('**/api/todos', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('https://demo.playwright.dev/todomvc/');
    
    // Validamos se o site lida bem com o erro (ex: não crasha)
    const todoList = page.locator('.todo-list');
    await expect(todoList).not.toBeVisible();
  });

  test('deve carregar dados customizados via Mock', async ({ page }) => {
    await page.route('**/api/todos', async route => {
      await route.fulfill({
        status: 200,
        json: [
            { id: 100, title: 'Tarefa vinda do Mock', completed: false }
        ]
      });
    });

    await page.goto('https://demo.playwright.dev/todomvc/');
    await expect(page.getByText('Tarefa vinda do Mock')).toBeVisible();
  });
});