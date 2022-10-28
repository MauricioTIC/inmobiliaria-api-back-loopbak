import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Inmueble} from '../models';
import {InmuebleRepository} from '../repositories/inmueble.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class InmuebleService {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository
  ) { }

  getInmueblesDisponibles(): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      where: {
        estado: 'A'
      }
    })
    return inmuebles;
  }

  getInmueblesPreciomMayorA(valor: number): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      where: {
        precio: {gt: valor}
      }
    })
    return inmuebles;
  }


  getInmueblesPorBarrio(ubicacion: string): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      include: ['imagenes', 'propietario'],
      where: {
        barrio: ubicacion
        //barrio: `/.*${ubicacion}.*/`

      }
    })
    return inmuebles;
  }

}
