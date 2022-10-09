import {injectable, /* inject, */ BindingScope, Provider} from '@loopback/core';

/*
 * Fix the service type. Possible options can be:
 * - import {Autenticacion} from 'your-module';
 * - export type Autenticacion = string;
 * - export interface Autenticacion {}
 */
export type Autenticacion = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionProvider implements Provider<Autenticacion> {
  constructor(/* Add @inject to inject parameters */) {}

  value() {
    // Add your implementation here
    throw new Error('To be implemented');
  }
}
