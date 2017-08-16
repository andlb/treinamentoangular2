import { EmpresaService } from "./../cadastro/empresa/empresa.service";
import { Http, Headers, RequestOptions } from "@angular/http";
import { AuthService } from "./../autenticar/auth.service";
import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "./../../environments/environment";
import { Subject } from "rxjs/Subject";
import { ErroMessage } from "./../share/erro.model";

@Injectable()
export class PropriedadeService {


  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private http: Http
  ) {
  }


}
