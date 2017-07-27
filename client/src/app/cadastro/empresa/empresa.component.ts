import { EmpresaService } from './empresa.service';

import { AuthService } from './../../autenticar/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit {
  form: FormGroup;
  empresa;
  messageClass;
  message;
  processing = false;
  emailValid;
  emailMessage;
  authSerSub:any;
  meuUsuario;
  classDadosCadastral="active";
  classFuncionario="";
  classServico="";

  constructor(

  ) {
  }

  ngOnInit() {

  }





}
