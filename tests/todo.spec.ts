import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { faker } from '@faker-js/faker';

test('deve adicionar tarefas na lista com sucesso', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Passo 1: Ir para a página
  await todoPage.goto();

  // Criamos um Array com 10 nomes aleatórios usando Node.js
    const tasks = Array.from({ length: 10 }, () => faker.git.commitMessage());

    for (const taskName of tasks) {
        await todoPage.addTodo(taskName);
    }

    await todoPage.checkCount(10); // Reutilizando a lógica de antes
});

test('deve riscar a tarefa ao completá-la', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const taskName = 'Aprender Atributos CSS';
  
    await todoPage.goto();
    await todoPage.addTodo(taskName);
  
    // Ação: Completar a tarefa
    await todoPage.markAsCompleted(taskName);
  
    // Validação: O CSS mudou?
    await todoPage.checkIsCompleted(taskName);
  });

  /*test('lidar com pop-ups e novas abas', async ({ page, context }) => {
    await page.goto('https://www.google.com'); // Exemplo genérico
  
    // 1. Começamos a "ouvir" o evento de nova página
    const pagePromise = context.waitForEvent('page');
  
    // 2. Clicamos num link que abre nova aba (exemplo hipotético)
    // await page.getByText('Ajuda').click(); 
  
    // 3. O Node/Playwright captura a nova página
    // const newPage = await pagePromise;
    // await expect(newPage).toHaveURL(/support/);
  });*/

