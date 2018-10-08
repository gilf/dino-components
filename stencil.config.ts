import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'dino-components',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
