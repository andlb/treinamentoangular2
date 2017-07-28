import { Subscription } from 'rxjs/Subscription';
import { Funcionario } from './funcionario.model';
import { EmpresaService } from './../empresa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-empresafuncionario',
  templateUrl: './empresafuncionario.component.html',
  styleUrls: ['./empresafuncionario.component.css']
})
export class EmpresafuncionarioComponent implements OnInit, OnDestroy {
  @ViewChild('nome') nome: ElementRef;
  form: FormGroup;
  subscription: Subscription;
  funcionarios: Funcionario[] = [];
  edit = false;
  indexFuncionario = -1;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.createForm();
    this.subscription = this.empresaService.empresaChanged.subscribe(
      (acao: any) => {
        if (acao === 'cancelaracao') {
          this.onLimpar()
          this.funcionarios = [];
        }
        if (acao === "desabilitarcampos") {
          this.desabilitaCampos();
        }
        if (acao === "habilitarcampos") {
          this.habilitaCampo()
        }
      }
    )
    this.funcionarios = this.empresaService.getFuncionario();
    if (!this.funcionarios) {
      this.funcionarios = [];
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  desabilitaCampos() {
    this.form.controls["nome"].disable();
    this.form.controls["email"].disable();
    this.processing = true;
  }

  habilitaCampo() {
    this.form.controls["nome"].enable();
    this.form.controls["email"].enable();
    this.processing = false;
  }

  createForm() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      email: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]]
    });
  }

  //TODO: Verificar para não existir duplicidade de e-mail cadastrado.
  enviaFuncionario() {
    console.log('teste');

    let funcionario = {
      nome: this.form.get("nome").value,
      email: this.form.get("email").value
    }
    if (!this.edit) {
      this.funcionarios.push(funcionario);
    } else {
      this.funcionarios[this.indexFuncionario] = funcionario;
    }
    this.empresaService.addFuncionario(this.funcionarios);
    this.onLimpar();

  }

  //deleta um registro da tela
  onDeletar() {
    this.funcionarios.splice(this.indexFuncionario, 1);
    this.indexFuncionario = -1
    this.empresaService.addFuncionario(this.funcionarios);
    this.onLimpar();
  }

  //coloca o formulario em estado de edição.
  onEditItem(index) {
    let funcionario = this.funcionarios[index];
    this.form.get("nome").setValue(funcionario.nome);
    this.form.get("email").setValue(funcionario.email);
    this.edit = true;
    this.indexFuncionario = index;

  }
  //limpa os campos do formulario
  onLimpar() {
    this.form.reset();
    this.nome.nativeElement.focus();
    this.indexFuncionario = -1;
    this.edit = false;
  }

}
