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

export class EmpresaComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) {
  }

  ngOnInit() {

  }
  cancelarAcao(){
    console.log('cancelar ação');
    this.empresaService.cancelarAcao();
  }


}
