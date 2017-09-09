import { AuthService } from './../../autenticar/auth.service';
import { EmpresaService } from "./../../cadastro/empresa/empresa.service";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { OficinaService } from "./../oficina.service";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-oficinacadastro",
  templateUrl: "./oficinacadastro.component.html",
  styleUrls: ["./oficinacadastro.component.css"]
})
export class OficinacadastroComponent implements OnInit, OnDestroy {
  @ViewChild("placa") placa: ElementRef;
  @ViewChild("quilometragem") quilometragem: ElementRef;
  form: FormGroup;
  edit: Boolean = false;
  processing: Boolean = false;
  messageClass;
  message;
  empresa;
  servicos = [];
  servicosRealizados = [];
  atendimentoid;
  cadastrado: false;

  subEnviar: Subscription;
  subEmpresa: Subscription;
  subPlaca: Subscription;
  subsPesquisa: Subscription;
  subsPesquisaAtendimento: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private oficinaService: OficinaService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.subsPesquisaAtendimento = this.route.params.subscribe(
      (params: Params) => {
        this.atendimentoid = params.id;
        if (this.atendimentoid) {
          this.processing = true;
          this.subsPesquisa = this.oficinaService
            .getAtendimento(this.atendimentoid)
            .subscribe(data => {
              if (!this.authService.verTokenValido(data.tokeninvalido) ){
                this.message = 'Usuário desconectado. Por favor, logue novamente.';
                this.messageClass = "alert alert-danger";
                setTimeout(() => {
                  this.router.navigate(["/login"]);
                }, 2000);
                return;
              }
              this.edit = true;
              this.oficinaService.setOrdemservicoid(this.atendimentoid);
              this.oficinaService.setVeiculo(data.veiculo);
              this.oficinaService.setProprietario(data.proprietario);
              this.servicos = data.servicos;
              this.servicosRealizados = data.servicorealizado;
              this.preencheFormulario();
              this.adicionarServicoForm();
              this.desabilitaPlaca();
              this.processing = false;
            });
        } else {
          let empresaid = this.oficinaService.empresaid;
          if (!empresaid) {
            this.messageClass = "alert alert-danger";
            this.message = "Empresa não cadastrada para o usuário";
          }
          this.processing = true;
          this.subEmpresa = this.empresaService
            .getEmpresa(empresaid)
            .subscribe(data => {
              this.message = "";
              if (!data) {
                this.messageClass = "alert alert-danger";
                this.message = "Empresa não encontrada";
              }
              if (!data.success) {
                this.messageClass = "alert alert-danger";
                this.message = "Empresa não encontrada";
              }
              if (data.success) {
                this.empresa = data.empresa;
                this.servicos = data.servicos;
                this.servicosRealizados = [];
                this.adicionarServicoForm();
                this.placa.nativeElement.focus();
                this.processing = false;
              }
            });
        }
      }
    );
    this.createForm();
  }

  onPesquisarPlaca() {
    if (this.processing || this.edit) return;
    let placa = this.form.controls["placa"].value;
    placa = placa.toUpperCase();
    if (placa) {
      this.processing = true;
      this.subPlaca = this.oficinaService
        .pesquisaVeiculo(placa)
        .subscribe(data => {
          if (!this.authService.verTokenValido(data.tokeninvalido) ){
            this.message = 'Usuário desconectado. Por favor, logue novamente.';
            this.messageClass = "alert alert-danger";
            setTimeout(() => {
              this.router.navigate(["/login"]);
            }, 2000);
            return;
          }
          if (!data) {
            this.messageClass = "alert alert-danger";
            this.message = "Erro desconhecido ao tentar realizar a pesquisa";
            return;
          }
          if (!data.success) {
            this.messageClass = "alert alert-danger";
            this.message = data.message;
            return;
          }
          if (data.veiculo && data.proprietario) {
            this.oficinaService.setVeiculo(data.veiculo);
            this.oficinaService.setProprietario(data.proprietario);
            if (data.proprietario.cadastrado) {
              this.cadastrado = data.proprietario.cadastrado;
            }
            this.preencheFormulario();
            this.quilometragem.nativeElement.focus();
          } else {
            //quando a placa não é encontrada.
            this.onLimpar();
            this.form.controls["placa"].setValue(placa);
          }
          this.processing = false;
        });
    }
  }

  ngOnDestroy() {
    if (this.subEnviar) this.subEnviar.unsubscribe();
    if (this.subEmpresa) this.subEmpresa.unsubscribe();
    if (this.subPlaca) this.subPlaca.unsubscribe();
    if (this.subsPesquisa) this.subsPesquisa.unsubscribe();
    if (this.subsPesquisaAtendimento)
      this.subsPesquisaAtendimento.unsubscribe();
  }
  preencheFormulario() {
    let veiculo = this.oficinaService.getVeiculo();
    let proprietario = this.oficinaService.getProprietario();
    let servico = this.oficinaService.getServicosRealizado();

    this.form.controls["placa"].setValue(veiculo.placa);
    this.form.controls["marca"].setValue(veiculo.marca);
    this.form.controls["modelo"].setValue(veiculo.modelo);
    this.form.controls["ano"].setValue(veiculo.ano);
    this.form.controls["anomodelo"].setValue(veiculo.anomodelo);
    this.form.controls["cpf"].setValue(proprietario.cpf);
    this.form.controls["nome"].setValue(proprietario.nome);
    this.form.controls["email"].setValue(proprietario.email);
    this.form.controls["dtnascimento"].setValue(proprietario.datanascimento);
    if (this.edit) {
      this.form.controls["email"].disable();
      this.form.controls["cpf"].disable();
      this.form.controls["quilometragem"].setValue(veiculo.quilometragem);
      this.quilometragem.nativeElement.focus();
    }
    if (this.cadastrado) {
      this.form.controls["email"].disable();
    }
  }

  desabilitaPlaca() {
    this.form.controls["placa"].disable();
  }
  habilitaPlaca() {
    this.form.controls["placa"].enable();
  }

  mudarCpf(event) {
    if (!this.edit) {
      if (this.oficinaService.getProprietario().cpf !== event.target.value) {
        this.form.controls["email"].enable();
        this.form.controls["nome"].setValue("");
        this.form.controls["email"].setValue("");
        this.form.controls["dtnascimento"].setValue("");
      }else{
        this.form.controls["nome"].setValue(this.oficinaService.getProprietario().nome);
        this.form.controls["email"].setValue(this.oficinaService.getProprietario().email);
        this.form.controls["dtnascimento"].setValue(this.oficinaService.getProprietario().datanascimento);
      }
    }
  }

  desabilitaCampos() {
    this.processing = true;
    this.form.controls["marca"].disable();
    this.form.controls["modelo"].disable();
    this.form.controls["ano"].disable();
    this.form.controls["anomodelo"].disable();
    this.form.controls["quilometragem"].disable();
    this.form.controls["cpf"].disable();
    this.form.controls["nome"].disable();
    this.form.controls["email"].disable();
    this.form.controls["dtnascimento"].disable();
    for (let control of (<FormArray>this.form.get("servicosForm")).controls) {
      (<FormGroup>control).controls["observacao"].disable();
    }
  }

  habilitaCampo() {
    this.processing = false;
    if (!this.edit) {
      this.habilitaPlaca();
    }
    this.form.controls["marca"].enable();
    this.form.controls["modelo"].enable();
    this.form.controls["ano"].enable();
    this.form.controls["anomodelo"].enable();
    this.form.controls["quilometragem"].enable();
    this.form.controls["cpf"].enable();
    this.form.controls["nome"].enable();
    this.form.controls["email"].enable();
    this.form.controls["dtnascimento"].enable();
    for (let control of (<FormArray>this.form.get("servicosForm")).controls) {
      (<FormGroup>control).controls["observacao"].enable();
    }
  }

  createForm() {
    let servicosForm = new FormArray([]);

    this.form = this.formBuilder.group({
      placa: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/[A-Z]{3}-?\d{3}/)
        ]
      ],
      marca: "",
      modelo: "",
      ano: "",
      anomodelo: "",
      cpf: ["", Validators.required],
      nome: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      dtnascimento: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
          )
        ]
      ],
      quilometragem: [
        "",
        [Validators.required, Validators.pattern(/^[0-9]*$/)]
      ],
      servicosForm: servicosForm
    });
  }

  onLimpar() {
    //this.placa.nativeElement.focus();
    this.edit = false;
    this.form.controls["placa"].setValue("");
    this.form.controls["marca"].setValue("");
    this.form.controls["modelo"].setValue("");
    this.form.controls["ano"].setValue("");
    this.form.controls["anomodelo"].setValue("");
    this.form.controls["quilometragem"].setValue("");
    this.form.controls["cpf"].setValue("");
    this.form.controls["nome"].setValue("");
    this.form.controls["email"].setValue("");
    this.form.controls["dtnascimento"].setValue("");

    this.servicosRealizados = [];
  }

  //coloca o formulario em estado de edição.
  onEditItem(index) {
    this.edit = true;
  }

  onDeletar() {
    this.processing = true;
    this.desabilitaCampos();
    let veiculo = {
      placa: this.form.controls["placa"].value,
      marca: this.form.controls["marca"].value,
      modelo: this.form.controls["modelo"].value,
      ano: this.form.controls["ano"].value,
      anomodelo: this.form.controls["anomodelo"].value,
      quilometragem: this.form.controls["quilometragem"].value
    };
    let proprietario = {
      cpf: this.form.controls["cpf"].value,
      nome: this.form.controls["nome"].value,
      email: this.form.controls["email"].value,
      datanascimento: this.form.controls["dtnascimento"].value,
      cadastrado: false
    };
    this.oficinaService.setVeiculo(veiculo);
    this.oficinaService.setProprietario(proprietario);
    this.subEnviar = this.oficinaService
      .inativaOrdemServico()
      .subscribe(data => {
        if (!data) {
          this.messageClass = "alert alert-danger";
          this.message = "Erro ao salvar as informações";
          this.processing = false;
          this.habilitaCampo();
          return;
        }
        if (!data.success) {
          this.messageClass = "alert alert-danger";
          this.message = data.message;
          this.processing = false;
          this.habilitaCampo();
          return;
        } else {
          this.messageClass = "alert alert-success";
          this.message = data.message;
          setTimeout(() => {
            this.router.navigate(["centroautomotivo/lista/edit"]);
            return;
          }, 2000);
        }
      });
  }

  enviaDados() {
    this.processing = true;
    this.desabilitaCampos();
    let veiculo = {
      placa: this.form.controls["placa"].value,
      marca: this.form.controls["marca"].value,
      modelo: this.form.controls["modelo"].value,
      ano: this.form.controls["ano"].value,
      anomodelo: this.form.controls["anomodelo"].value,
      quilometragem: this.form.controls["quilometragem"].value
    };
    let proprietario = {
      cpf: this.form.controls["cpf"].value,
      nome: this.form.controls["nome"].value,
      email: this.form.controls["email"].value,
      datanascimento: this.form.controls["dtnascimento"].value
    };
    this.servicosRealizados = [];
    for (let control of (<FormArray>this.form.get("servicosForm")).controls) {
      if (control.value.selecionado) {
        let servicoRealizado = {
          servicoid: control.value._id,
          observacao: control.value.observacao
        };
        this.servicosRealizados.push(servicoRealizado);
      }
    }

    this.oficinaService.setVeiculo(veiculo);
    this.oficinaService.setProprietario(proprietario);
    this.oficinaService.setServicosRealizado(this.servicosRealizados);

    this.subEnviar = this.oficinaService.atualizarDados().subscribe(data => {
      if (!data) {
        this.messageClass = "alert alert-danger";
        this.message = "Erro ao salvar as informações";
        this.processing = false;
        this.habilitaCampo();
        return;
      }
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.habilitaCampo();
        return;
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(["centroautomotivo/lista/edit"]);
        }, 2000);
        return;
      }
    });
  }
  defineObservacao(event, posicao) {
    this.servicos[posicao].obseracao = event.target.value;
  }

  defineServico(event, posicao) {
    let codigo = event.target.value;

    if (event.target.checked) {
      this.servicos[posicao].checked = true;

      let oServico = this.servicos.find(servico => servico._id === codigo);
      if (oServico) {
        this.servicosRealizados.push(oServico);
      }
    } else {
      this.servicos[posicao].checked = false;
      let indice = this.servicosRealizados.findIndex(
        servico => servico._id === codigo
      );

      if (indice > -1) {
        this.servicosRealizados.splice(indice, 1);
      }
    }
  }
  onVoltar() {
    this.router.navigate(["centroautomotivo/lista/edit"]);
  }

  adicionarServicoForm() {
    if (this.servicos) {
      for (let tServico of this.servicos) {
        let oServico = this.servicosRealizados.find(
          servicorealizado => servicorealizado.servicoid === tServico._id
        );
        let selecionado = false;
        let observacao = "";
        if (oServico) {
          selecionado = true;
          observacao = oServico.observacao;
        }
        (<FormArray>this.form.get("servicosForm")).push(
          this.formBuilder.group({
            _id: tServico._id,
            descricao: tServico.descricao,
            selecionado: selecionado,
            observacao: observacao
          })
        );
      }
    }
  }
}
