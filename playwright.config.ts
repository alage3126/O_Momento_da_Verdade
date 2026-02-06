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
    baseURL: 'https://demo.playwright.dev/todomvc', // Define a tua URL base aqui
    trace: 'on-first-retry',                       // Grava o "trace" (caixa negra) se falhar
    screenshot: 'only-on-failure',                 // Tira print apenas se houver erro
    video: 'retain-on-failure',                    // Grava vídeo apenas se houver erro
    
    // Configuração de dispositivos (Locators funcionam melhor com viewports fixos)
    viewport: { width: 1280, height: 720 },
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