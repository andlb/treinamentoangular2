import { EmpresaService } from './../../cadastro/empresa/empresa.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';
import { OficinaService } from './../oficina.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-oficinacadastro',
  templateUrl: './oficinacadastro.component.html',
  styleUrls: ['./oficinacadastro.component.css']
})
export class OficinacadastroComponent implements OnInit, OnDestroy {

  @ViewChild('placa') placa: ElementRef;
  form: FormGroup;
  edit: Boolean = false;
  processing: Boolean = false;
  messageClass;
  message;
  empresa;
  servicos=[];
  subEnviar: Subscription;
  subEmpresa: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private oficinaService: OficinaService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.createForm();
    let empresaid = this.oficinaService.empresaid;
    if (!empresaid) {
        this.messageClass = 'alert alert-danger';
        this.message = "Empresa não cadastrada para o usuário";
    }else {
      this.empresa = this.empresaService.getEmpresa(empresaid).subscribe(data => {
        this.message = "";
        console.log(data);
        if (!data){
          this.messageClass = 'alert alert-danger';
          this.message = "Empresa não encontrada";
        }
        if (!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = "Empresa não encontrada";
        }
        if (this.message) {
          //TODO: Mover para outra pagina.

        }
        if (data.success){
          this.empresa = data.empresa;
          this.servicos = data.empresa.servicos;
          console.log(this.servicos);
        }
      });
    }
  }

  onPesquisarPlaca() {

  }
  ngOnDestroy() {
    if (this.subEnviar) this.subEnviar.unsubscribe();

  }

  desabilitaCampos() {
    this.processing = true;
    this.form.controls["placa"].disable();
    this.form.controls["marca"].disable();
    this.form.controls["modelo"].disable();
    this.form.controls["ano"].disable();
    this.form.controls["anomodelo"].disable();
    this.form.controls["cpf"].disable();
    this.form.controls["nome"].disable();
    this.form.controls["email"].disable();
    this.form.controls["dtnascimento"].disable();
  }

  habilitaCampo() {
    this.processing = false;
    this.form.controls["placa"].enable();
    this.form.controls["marca"].enable();
    this.form.controls["modelo"].enable();
    this.form.controls["ano"].enable();
    this.form.controls["anomodelo"].enable();
    this.form.controls["cpf"].enable();
    this.form.controls["nome"].enable();
    this.form.controls["email"].enable();
    this.form.controls["dtnascimento"].enable();
  }

  createForm() {

    this.form = this.formBuilder.group({
      placa: '',
      marca: '',
      modelo: '',
      ano: '',
      anomodelo: '',
      cpf: '',
      nome: '',
      email: '',
      dtnascimento: ''
    });
  }


  onLimpar() {
    this.placa.nativeElement.focus();
    this.edit = false;
    this.form.controls["placa"].setValue('');
    this.form.controls["marca"].setValue('');
    this.form.controls["modelo"].setValue('');
    this.form.controls["ano"].setValue('');
    this.form.controls["anomodelo"].setValue('');
    this.form.controls["cpf"].setValue('');
    this.form.controls["nome"].setValue('');
    this.form.controls["email"].setValue('');
    this.form.controls["dtnascimento"].setValue('');
  }

  //coloca o formulario em estado de edição.
  onEditItem(index) {
    this.edit = true;
  }


  enviaDados() {

    let veiculo = {
      placa: this.form.controls["placa"].value,
      marca: this.form.controls["marca"].value,
      modelo: this.form.controls["modelo"].value,
      ano: this.form.controls["ano"].value,
      anomodelo: this.form.controls["anomodelo"].value,
    }
    let proprietario = {
      cpf: this.form.controls["cpf"].value,
      nome: this.form.controls["nome"].value,
      email: this.form.controls["email"].value,
      dtnascimento: this.form.controls["dtnascimento"].value
    }
    console.log(veiculo);
    console.log(proprietario);
    this.oficinaService.setVeiculo(veiculo);
    this.oficinaService.setProprietario(proprietario);
    this.subEnviar = this.oficinaService.atualizarDados().subscribe(data => {
      if (!data) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Erro ao salvar as informações';
        return;
      }
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        return;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        return;
      }
    });

    //this.onLimpar();
  }


}
