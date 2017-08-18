import { ErroMessage } from "./../../share/erro.model";
import { SurveyComponent } from "./../../oficina/survey/survey.component";

import { EmpresaService } from "./../../cadastro/empresa/empresa.service";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { ProprietarioService } from "./../proprietario.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
@Component({
  selector: "app-veiculo",
  templateUrl: "./veiculo.component.html",
  styleUrls: ["./veiculo.component.css"]
})
export class VeiculoComponent implements OnInit {
  @ViewChild("placa") placa: ElementRef;
  form: FormGroup;
  edit: Boolean = false;
  processing: Boolean = false;
  messageClass;
  message;
  subPesquisa: Subscription;
  subsPesquisaAtendimento: Subscription;
  veiculoid;
  veiculo;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private proprietarioServ: ProprietarioService
  ) {}

  ngOnInit() {
    this.createForm();
    this.subsPesquisaAtendimento = this.route.params.subscribe(
      (params: Params) => {
        this.veiculoid = params.id;
        if (this.veiculoid) {
          this.subPesquisa = this.proprietarioServ
            .getDadosVeiculo(this.veiculoid)
            .subscribe(data => {
              if (!data.success) {
                this.message = data.message;
                this.messageClass = "alert alert-danger";
              }
              this.veiculo = {
                placa: data.placa,
                marca: data.marca,
                modelo: data.modelo,
                ano: data.ano
              };
              this.preencheFormulario();
            });
        }
      }
    );
  }

  preencheFormulario() {
    this.form.controls["placa"].setValue(this.veiculo.placa);
    this.form.controls["marca"].setValue(this.veiculo.marca);
    this.form.controls["modelo"].setValue(this.veiculo.modelo);
    this.form.controls["ano"].setValue(this.veiculo.ano);
    this.form.controls["anomodelo"].setValue(this.veiculo.anomodelo);
  }

  desabilitaCampos() {
    this.processing = true;
    this.form.controls["placa"].disable();
    this.form.controls["marca"].disable();
    this.form.controls["modelo"].disable();
    this.form.controls["ano"].disable();
    this.form.controls["anomodelo"].disable();
  }

  habilitaCampo() {
    this.form.controls["placa"].disable();
    this.form.controls["marca"].enable();
    this.form.controls["modelo"].enable();
    this.form.controls["ano"].enable();
    this.form.controls["anomodelo"].enable();
  }

  createForm() {
    let servicosForm = new FormArray([]);
    this.form = this.formBuilder.group({
      placa: "",
      marca: "",
      modelo: "",
      ano: "",
      anomodelo: ""
    });
  }

  onLimpar() {
    this.placa.nativeElement.focus();
    this.edit = false;
    this.form.controls["placa"].setValue("");
    this.form.controls["marca"].setValue("");
    this.form.controls["modelo"].setValue("");
    this.form.controls["ano"].setValue("");
    this.form.controls["anomodelo"].setValue("");
  }

  //coloca o formulario em estado de edição.
  onEditItem(index) {
    this.edit = true;
  }

  enviaDados() {
    this.processing = true;
    this.desabilitaCampos();
    let veiculo = {
      placa: this.form.controls["placa"].value,
      marca: this.form.controls["marca"].value,
      modelo: this.form.controls["modelo"].value,
      ano: this.form.controls["ano"].value,
      anomodelo: this.form.controls["anomodelo"].value
    };
  }

  ngOnDestroy() {
    if (this.subsPesquisaAtendimento) {
      this.subsPesquisaAtendimento.unsubscribe();
    }
    if (this.subPesquisa) {
      this.subPesquisa.unsubscribe();
    }
  }
}