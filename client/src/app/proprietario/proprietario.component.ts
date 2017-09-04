import { AuthService } from './../autenticar/auth.service';
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ProprietarioService } from "./proprietario.service";
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: "app-proprietario",
  templateUrl: "./proprietario.component.html",
  styleUrls: ["./proprietario.component.css"]
})
export class ProprietarioComponent implements OnInit {
  subscription: Subscription;
  subsPesqParamPropr: Subscription;
  subsPesq: Subscription;
  proprietarioId;
  messageClass;
  message;
  proprietario: any;
  servicosrealizado:any;
  processing = false;


  constructor(
    private authService : AuthService,
    private formBuilder: FormBuilder,
    private proprietarioServ: ProprietarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.processing=true;
    this.proprietarioId = this.authService.getUsuarioIdFromStorage();
    this.subsPesq = this.proprietarioServ
      .getDadosProprietario(this.proprietarioId)
      .subscribe(data => {

        if (!this.authService.verTokenValido(data.tokeninvalido) ){
          this.message = 'Usuário desconectado. Por favor, logue novamente.';
          this.messageClass = "alert alert-danger";
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
          return;
        }
        this.proprietario     = data.proprietario;
        this.servicosrealizado = data.servicorealizados;
        this.processing = false;
      });
  }

  ngOnDestroy() {
    if (this.subsPesqParamPropr) this.subsPesqParamPropr.unsubscribe();
    if (this.subsPesq) this.subsPesq.unsubscribe();
  }
  irProfile(){
    this.router.navigate(['/profile', this.proprietarioId,'areaproprietario']);
  }
  irVeiculo(veiculoid){
    this.router.navigate(['/areaproprietario/veiculo',veiculoid]);
  }
}
