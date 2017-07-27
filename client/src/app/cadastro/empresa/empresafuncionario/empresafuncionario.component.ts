import { EmpresaService } from './../empresa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresafuncionario',
  templateUrl: './empresafuncionario.component.html',
  styleUrls: ['./empresafuncionario.component.css']
})
export class EmpresafuncionarioComponent implements OnInit {
  form: FormGroup;
  funcionario = Array();
  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      email:['',[Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30),
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]]
    });
  }

  addFuncionario(){

  }

}
