// Uncomment these imports to begin using these cool features!

import {get} from '@loopback/rest';

export class SaludarController {
  constructor() { }

  @get('/saludar')
  saludar(): string {
    return ('Hola Mundo de Loopback desde NodeJS');
  }
}
