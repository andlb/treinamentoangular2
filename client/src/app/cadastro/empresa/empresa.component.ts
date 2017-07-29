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

export class EmpresaComponent implements OnInit,OnDestroy {
  cadastroInvalido = true;
  private subscription: Subscription;
  private subsEnvio: Subscription;
  messageClass;
  message;
  processing;
  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) {


  }

  ngOnInit() {
    this.subscription = this.empresaService.empresaChanged.subscribe(
      (acao: any) => {
        if (acao === "cadastroValido"){
          this.cadastroInvalido = false;
          return;
        }
      }
    );
   }

  cancelarAcao(){
    this.empresaService.cancelarAcao();
  }

  salvar(){
    this.processing = true;
    if  (!this.empresaService.verificaDadosValido()){
       //TODO:Mostra a tela de cadastro quando retornar false;
         this.messageClass = 'alert alert-danger';
         this.message = 'Dados da tela de cadastro inválido';
         this.processing = false;
         this.empresaService.empresaChanged.next('habilitarcampos');
       return;
     }
      console.log('chamando o desabilitar campo');
    this.empresaService.empresaChanged.next('desabilitarcampos');
    this.subsEnvio = this.empresaService.cadastraEmpresa().subscribe(
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
