
import { Subscription } from "rxjs/Subscription";
import { EmpresaRoutingModule } from "./../cadastro/empresa/empresa-routing.module";
import { FlashMessagesService } from "angular2-flash-messages";

import { Component, OnInit,OnDestroy } from "@angular/core";
import { AuthService } from "../autenticar/auth.service";
import { Router } from "@angular/router";
import { Acesso } from './../share/acesso.model';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  acesso:Acesso;
  empresaid;
  empresanome;
  nome;
  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show("Aplicação desconectada", {
      cssClass: "alert-info"
    });
    this.router.navigate(["/"]);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  gestaoAcesso(url) {
    let retorno = false;
    if (!this.authService.loggedIn()) {
      return retorno;
    }
    return this.acesso.getAcesso(url);
  }


  ngOnInit() {
    this.acesso = new Acesso();
    let oEmpresa = this.authService.getEmpresaFromStorage();
    if (oEmpresa) {
      this.empresaid = oEmpresa.empresaid;
      this.empresanome = oEmpresa.empresanome;
    }
    this.nome = this.authService.getUsuarioNome();
    this.subscription = this.authService.empresaChanged.subscribe(
      (acao: any) => {
        var oEmpresa = this.authService.getEmpresaFromStorage();
        if (oEmpresa) {
          this.empresaid = oEmpresa.empresaid;
          this.empresanome = oEmpresa.empresanome;
          this.nome = this.authService.getUsuarioNome();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
