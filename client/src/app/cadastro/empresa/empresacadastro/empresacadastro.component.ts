import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from './../empresa.service';
import { AuthService } from './../../../autenticar/auth.service';

@Component({
  selector: 'app-empresacadastro',
  templateUrl: './empresacadastro.component.html',
  styleUrls: ['./empresacadastro.component.css']
})
export class EmpresacadastroComponent implements OnInit,OnDestroy {
  @ViewChild('email') email: ElementRef;
  form: FormGroup;
  empresa;
  empresaid;
  subscription: Subscription;
  subsPesquisa: Subscription;
  valueChanged: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit() {

    this.createForm();
    this.email.nativeElement.focus();
    //realiza a consulta.
    this.route.params
      .subscribe(
        (params: Params) => {
          this.empresaid = params.id;
          if (this.empresaid) {
            this.subsPesquisa = this.empresaService.getEmpresa(this.empresaid).subscribe(data => {
              if (!data.success){
                //TODO: mostrar um erro quando a informação não é encontrada.
                return;
              }
              this.empresaService.addEmpresa(data.empresa);
              this.empresaService.setEmpresaid(this.empresaid);
              this.atualizaForm();
            });
          }
        }
      );
    this.subscription = this.empresaService.empresaChanged.subscribe(
      (acao: any) => {
        if (acao === "cancelaracao"){
          this.form.reset();
          return;
        }
        if (acao === "desabilitarcampos") {
          this.desabilitaCampos();
        }
        if (acao === "habilitarcampos"){
          this.habilitaCampo()
        }
      }
    )

  }
  atualizaForm(){
    this.empresa = this.empresaService.getCadastro();
    this.form.controls["nomeresponsavel"].setValue(this.empresa.nomeresponsavel);
    this.form.controls["nomefantasia"].setValue(this.empresa.nomefantasia);
    this.form.controls["razaosocial"].setValue(this.empresa.razaosocial);
    this.form.controls["telefone"].setValue(this.empresa.telefone);
    this.form.controls["celular"].setValue(this.empresa.celular);
    this.form.controls["endereco"].setValue(this.empresa.endereco);
    this.form.controls["bairro"].setValue(this.empresa.bairro);
    this.form.controls["numero"].setValue(this.empresa.numero);
    this.form.controls["complemento"].setValue(this.empresa.complemento);
    this.form.controls["estado"].setValue(this.empresa.estado);
    this.form.controls["cidade"].setValue(this.empresa.cidade);
    this.form.controls["CEP"].setValue(this.empresa.cep);
    this.form.controls["email"].setValue(this.empresa.email);
    this.email.nativeElement.focus();
  }

  createForm() {
    this.empresa = this.empresaService.getCadastro();
    if (!this.empresa) {
      this.empresa = {};
    }
    this.form = this.formBuilder.group({
      nomefantasia: [this.empresa.nomefantasia, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      razaosocial: [this.empresa.razaosocial, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      nomeresponsavel: [this.empresa.nomeresponsavel, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      telefone: [this.empresa.telefone, [Validators.required, Validators.pattern(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/)]],
      celular: [this.empresa.celular, [Validators.required, Validators.pattern(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/)]],
      endereco: [this.empresa.endereco],
      bairro: [this.empresa.bairro],
      numero: [this.empresa.numero],
      complemento: [this.empresa.complemento],
      cidade: [this.empresa.cidade],
      estado: [this.empresa.estado],
      CEP: [this.empresa.cep, Validators.pattern(/\d{5}\-\d{3}/)],
      email: [this.empresa.email,
        [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],

    });
    this.valueChanged = this.form.valueChanges
      .subscribe(data => {
        this.empresaService.setCadastroValido(this.form.valid);
        this.addCadastro();
      });
  }


  habilitaCampo() {
    this.form.controls["nomeresponsavel"].enable();
    this.form.controls["nomefantasia"].enable();
    this.form.controls["razaosocial"].enable();
    this.form.controls["telefone"].enable();
    this.form.controls["celular"].enable();
    this.form.controls["endereco"].enable();
    this.form.controls["bairro"].enable();
    this.form.controls["numero"].enable();
    this.form.controls["complemento"].enable();
    this.form.controls["estado"].enable();
    this.form.controls["cidade"].enable();
    this.form.controls["CEP"].enable();
    this.form.controls["email"].enable();
  }

  desabilitaCampos() {
    this.form.controls["nomeresponsavel"].disable();
    this.form.controls["nomefantasia"].disable();
    this.form.controls["razaosocial"].disable();
    this.form.controls["telefone"].disable();
    this.form.controls["celular"].disable();
    this.form.controls["endereco"].disable();
    this.form.controls["bairro"].disable();
    this.form.controls["numero"].disable();
    this.form.controls["complemento"].disable();
    this.form.controls["estado"].disable();
    this.form.controls["cidade"].disable();
    this.form.controls["CEP"].disable();
    this.form.controls["email"].disable();
  }

  addCadastro(){
    const empresa = {
      nomeresponsavel: this.form.get("nomeresponsavel").value,
      nomefantasia: this.form.get("nomefantasia").value,
      razaosocial: this.form.get("razaosocial").value,
      telefone: this.form.get("telefone").value,
      celular: this.form.get("celular").value,
      endereco: this.form.get("endereco").value,
      bairro: this.form.get("bairro").value,
      complemento: this.form.get('complemento').value,
      cidade: this.form.get('cidade').value,
      estado: this.form.get('estado').value,
      CEP: this.form.get('CEP').value,
      email:this.form.get('email').value
    }
    this.empresaService.addCadastro(empresa);
  }

  ngOnDestroy(){
    if (this.subscription) this.subscription.unsubscribe();
    if (this.valueChanged) this.valueChanged.unsubscribe();
    if (this.subsPesquisa) this.subsPesquisa.unsubscribe();

  }
}
