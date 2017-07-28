import { Subscription } from 'rxjs/Subscription';
///TODO: Quando o navbar vem selecinado, ele não está indicando qual opção está selecionada.
import { AuthService } from './../../autenticar/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit,OnDestroy {

  cadastroInvalido = true;
  subscription: Subscription;

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



  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
