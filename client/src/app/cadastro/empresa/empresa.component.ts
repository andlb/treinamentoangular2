import { AuthService } from './../../autenticar/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  form: FormGroup;
  usuario;
  messageClass;
  message;
  processing = false;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.getEmpresa();
    this.createForm();
  }
  createForm(){

  }
  getEmpresa(){

  }
  submitEmpresa(){

  }
  ngOnInit() {
  }

}
