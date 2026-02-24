import { test, expect } from '../fixtures/baseTest';

test('deve validar popup de erro no portal Stargate', async ({ loginPage, page }) => {
  await loginPage.goto();
  
  // 1. Tenta o login com dados fakes
  await loginPage.login('utilizador_invalido', 'senha_errada');

  // 2. Validação robusta baseada no que o debug nos deu
  // Procuramos por um elemento que tenha o texto 'Login' e seja um alerta/dialog
  const errorMessage = page.getByText('warning Login close'); 
  
  // Vamos ser mais específicos para evitar falsos positivos
  await expect(errorMessage).toBeVisible();
  
  console.log('Sucesso: O popup de erro apareceu como esperado.');
});