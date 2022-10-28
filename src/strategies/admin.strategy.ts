import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, RedirectRoute, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services/autenticacion.service';

export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {
  }


  async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.servicioAutenticacion.validarTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      } else {
        throw new HttpErrors[401]('Token no válido');
      }
    } else {
      throw new HttpErrors[401]('No se ha detectado el token de la solitud');
    }
  }

}
