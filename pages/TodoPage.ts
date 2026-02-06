import { Locator, Page, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    // Usamos Roles! Lembras-te?
    this.todoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
  }

  async goto() {
    await this.page.goto('');
  }

  async addTodo(text: string) {
    // 1. Garantir que o input está visível e vazio antes de começar
    await expect(this.todoInput).toBeVisible();
    
    // 2. Preencher o texto
    await this.todoInput.fill(text);
    
    // 3. Pressionar Enter e esperar que o input limpe (sinal de que foi processado)
    await this.todoInput.press('Enter');
    await expect(this.todoInput).toBeEmpty(); 
  }

  async checkCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  async markAsCompleted(text: string) {
    // Localizamos o item que contém o texto e clicamos no checkbox (o círculo à esquerda)
    const todoItem = this.page.locator('.view', { hasText: text });
    await todoItem.getByRole('checkbox').check();
  }

  async checkIsCompleted(text: string) {
    const todoItem = this.page.locator('li', { hasText: text });
    // Validamos se a classe 'completed' foi adicionada ao elemento <li>
    await expect(todoItem).toHaveClass(/completed/);
  }

}   