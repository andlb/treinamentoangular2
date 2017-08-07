import { EmpresaService } from './../../cadastro/empresa/empresa.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import { OficinaService } from './../oficina.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  servicosRealizados=[];
  atendimentoid;

  subEnviar: Subscription;
  subEmpresa: Subscription;
  subPlaca: Subscription;
  subsPesquisa:Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private oficinaService: OficinaService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.atendimentoid = params.id;
    //       if (this.atendimentoid) {
    //         this.subsPesquisa = this.oficinaService.getAtendimento(this.atendimentoid).subscribe({

    //             this.atualizaForm();
    //         });

    //         this.subsPesquisa = this.empresaService.getEmpresa(this.empresaid).subscribe(data => {
    //           if (!data.success){
    //             //TODO: mostrar um erro quando a informação não é encontrada.
    //             return;
    //           }
    //           this.empresaService.addEmpresa(data.empresa);
    //           this.empresaService.setEmpresaid(this.empresaid);
    //           //this.atualizaForm();
    //         });
    //       }
    //     }
    //   );
    this.createForm();
    let empresaid = this.oficinaService.empresaid;
    if (!empresaid) {
        this.messageClass = 'alert alert-danger';
        this.message = "Empresa não cadastrada para o usuário";
    }else {
      this.empresa = this.empresaService.getEmpresa(empresaid).subscribe(data => {
        this.message = "";
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
          this.servicosRealizados = [];
        }
      });
    }
  }

  onPesquisarPlaca() {
    console.log('Pesquisar placa');
    let placa = this.form.controls["placa"].value;
    if (placa) {
      this.subPlaca = this.oficinaService.pesquisaVeiculo(placa).subscribe(data => {
        if (!data) {
          this.messageClass = 'alert alert-danger';
          this.message = 'Erro desconhecido ao tentar realizar a pesquisa';
        }
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        }
        this.oficinaService.setVeiculo(data.veiculo);
        this.oficinaService.setProprietario(data.usuario);
      });
    }
  }

  ngOnDestroy() {
    if (this.subEnviar) this.subEnviar.unsubscribe();
    if (this.subEmpresa) this.subEmpresa.unsubscribe();
    if (this.subPlaca) this.subPlaca.unsubscribe();
    if (this.subsPesquisa) this.subsPesquisa.unsubscribe();
  }
  preencheFormulario(){
    let veiculo = this.oficinaService.getVeiculo();
    let proprietario = this.oficinaService.getProprietario();
    let servico = this.oficinaService.getServicosRealizar();

    this.form.controls["placa"].setValue(veiculo.placa);
    this.form.controls["marca"].setValue(veiculo.marca);
    this.form.controls["modelo"].setValue(veiculo.modelo);
    this.form.controls["ano"].setValue(veiculo.ano);
    this.form.controls["anomodelo"].setValue(veiculo.anomodelo);
    this.form.controls["cpf"].setValue(proprietario.cpf);
    this.form.controls["nome"].setValue(proprietario.nome);
    this.form.controls["email"].setValue(proprietario.email);
    this.form.controls["dtnascimento"].setValue(proprietario.dtnascimento);
    this.form.controls["quilometragem"].setValue(veiculo.quilometragem);
  }

  desabilitaCampos() {
    this.processing = true;
    this.form.controls["placa"].disable();
    this.form.controls["marca"].disable();
    this.form.controls["modelo"].disable();
    this.form.controls["ano"].disable();
    this.form.controls["anomodelo"].disable();
    this.form.controls["quilometragem"].disable();
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
    this.form.controls["quilometragem"].enable();
    this.form.controls["cpf"].enable();
    this.form.controls["nome"].enable();
    this.form.controls["email"].enable();
    this.form.controls["dtnascimento"].enable();
  }

  createForm() {
    this.form = this.formBuilder.group({
      placa: ['',[Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/[A-Z]{3}-?\d{3}/)
          ]],
      marca: '',
      modelo: '',
      ano: '',
      anomodelo: '',
      cpf: ['',Validators.required],
      nome: ['',Validators.required],
      email:['',[Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          ]],
      dtnascimento: ['',[Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)
          ]],
      quilometragem: ['',[Validators.required,
                          Validators.pattern(/^[0-9]*$/)
      ]]
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
    this.form.controls["quilometragem"].setValue('');
    this.servicosRealizados=[];
  }

  //coloca o formulario em estado de edição.
  onEditItem(index) {
    this.edit = true;
  }

  enviaDados() {
    this.processing = true;
    let veiculo = {
      placa: this.form.controls["placa"].value,
      marca: this.form.controls["marca"].value,
      modelo: this.form.controls["modelo"].value,
      ano: this.form.controls["ano"].value,
      anomodelo: this.form.controls["anomodelo"].value,
      quilometragem: this.form.controls["quilometragem"].value
    }
    let proprietario = {
      cpf: this.form.controls["cpf"].value,
      nome: this.form.controls["nome"].value,
      email: this.form.controls["email"].value,
      dtnascimento: this.form.controls["dtnascimento"].value
    }
    this.oficinaService.setVeiculo(veiculo);
    this.oficinaService.setProprietario(proprietario);
    this.oficinaService.setServicosRealizar(this.servicosRealizados);
    this.subEnviar = this.oficinaService.atualizarDados().subscribe(data => {
      this.processing = false;
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
  }

  defineServico(event){
    let codigo = event.target.value
    if (event.target.checked){
      let oServico = this.servicos.find(servico => servico._id === codigo)
      if (oServico){
        this.servicosRealizados.push(oServico);
      }
    }else{
      let indice = this.servicosRealizados.findIndex((servico) => servico._id === codigo)
      if (indice > -1) {
        this.servicosRealizados.splice(indice,1)
      }
    }
  }

}
