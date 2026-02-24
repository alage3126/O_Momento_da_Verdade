import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,      // Execução em paralelo (o que dá velocidade)
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // No CI, se falhar, tenta outra vez (combate flakiness)
  workers: process.env.CI ? 1 : undefined,

  
  reporter: [
    ['html'],                                      // Gera um relatório HTML completo
    ['list']                                       // Mostra o progresso no terminal
  ],

  use: {
    ignoreHTTPSErrors: true, 
    launchOptions: {
    // Isto força o Chrome a ignorar todas as políticas de segurança de rede
    args: [
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
    ]
  }
    },
  

  /* Configuração de Browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});