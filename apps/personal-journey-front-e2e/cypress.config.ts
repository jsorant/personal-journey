import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run personal-journey-front:serve:development',
        production: 'nx run personal-journey-front:serve:production',
      },
      ciWebServerCommand: 'nx run personal-journey-front:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
