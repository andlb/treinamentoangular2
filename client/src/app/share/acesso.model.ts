import { AuthService } from './../autenticar/auth.service';

export class Acesso {
  private usuario;
  constructor() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  getAcesso(url:string){
    let retorno = true;
    //usuarios que trabalham na mecanica ou centro automotivo
    if (this.usuario.tipo === 1){
      if (url.indexOf('/centroautomotivo/') > -1) {
        retorno = true;
      }
      return retorno;
    }
    //usuarios proprietário e veiculo.
    if (this.usuario.tipo === 0){
      if (url.indexOf('/profile/') > -1) {
        retorno = true;
      }
      if (url.indexOf('/areaproprietario/') > -1) {
        retorno = true;
      }
      return retorno;
    }
    if (this.usuario.tipo === 2){
      return true;
    }
    return retorno;
  }
}
