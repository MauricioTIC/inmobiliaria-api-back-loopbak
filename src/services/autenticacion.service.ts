import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Propietario} from '../models/propietario.model';
import {PropietarioRepository} from '../repositories/propietario.repository';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository
  ) { }

  generarClave() {
    let clave = generador(8, false);
    cryptoJS.MD5(clave).toString();

    return clave;
  }

  cifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  validarAcceso(usuario: string, clave: string) {
    try {
      let prop = this.propietarioRepository.findOne({
        where: {
          correo: usuario,
          clave: clave
        }
      });
      if (prop)
        return prop;

      return false;
    } catch (error) {
      return false;
    }
  }

  //crear in Web Token
  generarTokenJWT(propietario: Propietario) {
    let token = jwt.sign({
      data: {
        id: propietario.id,
        correo: propietario.correo,
        nombre: `${propietario.nombres} ${propietario.apellidos}`,
      }
    },
      llaves.claveJWT);

    return token;
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }
}
