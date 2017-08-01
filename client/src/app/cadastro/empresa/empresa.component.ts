import { Router } from '@angular/router';
///TODO: Quando o navbar vem selecinado, ele não está indicando qual opção está selecionada.
import { AuthService } from './../../autenticar/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from './empresa.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit, OnDestroy {
  cadastroInvalido = true;
  private subscription: Subscription;
  private subsEnvio: Subscription;
  messageClass;
  message;
  processing;
  novo: Boolean = false;
  edicao: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.novo = false;
    this.edicao = false;
    this.subscription = this.empresaService.empresaChanged.subscribe(
      (acao: any) => {
        if (acao === "cadastroValido") {
          this.cadastroInvalido = false;
          return;
        }
        if (acao === "edicao") {
          this.edicao = true;
          this.novo = false;
        }
      }
    );
  }

  cancelarAcao() {
    this.edicao = false;
    this.novo = false;

    this.empresaService.cancelarAcao();
    this.router.navigate(["/empresa/lista"]);
  }

  onNovo() {
    this.novo = true;
    this.edicao = false;
    this.empresaService.empresaChanged.next("novo");
  }

  salvar() {
    this.processing = true;
    this.edicao = false;
    this.novo = false;
    if (!this.empresaService.verificaDadosValido()) {
      //TODO:Mostra a tela de cadastro quando retornar false;
      this.messageClass = 'alert alert-danger';
      this.message = 'Dados da tela de cadastro inválido';
      this.processing = false;
      this.empresaService.empresaChanged.next('habilitarcampos');
      return;
    }
    this.empresaService.empresaChanged.next('desabilitarcampos');
    this.subsEnvio = this.empresaService.atualizaEmpresa().subscribe(
      (data) => {
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processing = false;
          this.empresaService.empresaChanged.next('habilitarcampos');
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          setTimeout(() => {
            this.processing = false;
            this.empresaService.empresaChanged.next('habilitarcampos');
            this.empresaService.empresaChanged.next('cancelaracao');
            this.messageClass = '';
            this.message = '';
            this.router.navigate(["/empresa/lista"],{ skipLocationChange: true });
          }, 2000);
        }
      }
    );;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subsEnvio) this.subsEnvio.unsubscribe();
  }
}
