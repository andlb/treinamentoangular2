import { Status } from './../../../share/status.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { EmpresaService } from './../empresa.service';
import { Pergunta } from './pergunta.model';
import { Tipopergunta } from './tipopergunta.model';

@Component({
  selector: 'app-empresapergunta',
  templateUrl: './empresapergunta.component.html',
  styleUrls: ['./empresapergunta.component.css']
})
export class EmpresaperguntaComponent implements OnInit, OnDestroy {

  @ViewChild('descricao') descricao: ElementRef;
  form: FormGroup;
  subscription: Subscription;
  perguntas: Pergunta[] = [];
  processing: Boolean = false;
  edit: Boolean = false;
  indexPergunta;

  tipos: Tipopergunta[] = [
    new Tipopergunta("1", "Caixa de comentário"),
    new Tipopergunta("2", "O quanto indica a empresa"),
    new Tipopergunta("3", "5 estrelas")
  ];

  status: Status[] = [
    new Status("1", "Ativo"),
    new Status("0", "Inativo")
  ]

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(
  ) {
    this.perguntas = [];
    this.edit = false;
    this.indexPergunta = -1;
    this.createForm();
    this.perguntas = this.empresaService.getPergunta();

    if (!this.perguntas) this.perguntas = [];
    this.subscription = this.empresaService.empresaChanged.subscribe(
      (acao: any) => {
        if (acao === "cancelaracao") {
          this.form.reset();
          return;
        }
        if (acao === "desabilitarcampos") {
          this.desabilitaCampos();
        }
        if (acao === "habilitarcampos") {
          this.habilitaCampo()
        }
      }
    )
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  desabilitaCampos() {
    this.form.controls["descricao"].disable();
    this.form.controls["tipo"].disable();
    this.form.controls["status"].disable();
    this.processing = true;
  }

  habilitaCampo() {
    this.form.controls["descricao"].enable();
    this.form.controls["tipo"].enable();
    this.form.controls["status"].enable();
    this.processing = false;
  }

  createForm() {
    this.form = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      tipo: ['1', Validators.required],
      status: ['1', Validators.required]
    });
  }

  onLimpar() {
    this.form.get("descricao").setValue("");
    this.form.get("tipo").setValue("1");
    this.form.get("status").setValue("1");
    this.descricao.nativeElement.focus();
    this.edit = false;
    this.indexPergunta = -1;

  }

  //coloca o formulario em estado de edição.
  onEditItem(index) {
    let pergunta = this.perguntas[index];
    this.form.get("descricao").setValue(pergunta.descricao);
    this.form.get("tipo").setValue(pergunta.tipo);
    this.form.get("status").setValue(pergunta.status);
    this.edit = true;
    this.indexPergunta = index;
  }

  //deleta um registro da tela
  onDeletar() {
    this.perguntas.splice(this.indexPergunta, 1);
    this.indexPergunta = -1
    this.empresaService.addPergunta(this.perguntas);
    this.onLimpar();
  }

  enviaPergunta() {
    let pergunta = {
      descricao: this.form.get("descricao").value,
      tipo: this.form.get("tipo").value,
      status: this.form.get("status").value
    };
    if (!this.edit) {
      this.perguntas.push(pergunta);
    } else {
      this.perguntas[this.indexPergunta] = pergunta;
    }
    this.empresaService.addPergunta(this.perguntas);
    this.onLimpar();
  }

  getTipo(codigo) {
    return this.tipos.find(tipo => tipo.id === codigo).descricao;
  }

  getStatus(codigo) {
    let oStatus = this.status.find(status => status.id === codigo)
    if (oStatus) {
      return oStatus.descricao;
    }else {
      return "";
    }
  }
}
