import { DecimalPipe } from '@angular/common';
import { AuthService } from './../autenticar/auth.service';
import { Subscription } from "rxjs/Subscription";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ProprietarioService } from "./proprietario.service";
import { UpperCasePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: "app-proprietario",
  templateUrl: "./proprietario.component.html",
  styleUrls: ["./proprietario.component.css"]
})
export class ProprietarioComponent implements OnInit {
  subscription: Subscription;
  subsPesqParamPropr: Subscription;
  subsPesq: Subscription;
  proprietarioId;
  messageClass;
  message;
  proprietario: any;
  servicosrealizado:any;
  processing = false;

  oleoultima=[];
  oleodata=[];
  oleokm=[];
  filtroultima=[];
  filtrodata=[];
  filtrokm=[];
  injecaoultima=[];
  injecaodata=[];
  injecaokm=[];
  bicoultima=[];
  bicodata=[];
  bicokm=[];
  velasultima=[];
  velasdata=[];
  velaskm=[];
  freiosultima=[];
  freiosdata=[];
  freioskm=[];
  correiaultima=[];
  correiadata=[];
  correiakm=[];
  suspensaoultima=[];
  suspensaodata=[];
  suspensaokm=[];
  pneusultima=[];
  pneusdata=[];
  pneuskm=[];
  rodizioultima=[];
  rodiziodata=[];
  rodiziokm=[];
  alinhamentoultima=[];
  alinhamentodata=[];
  alinhamentokm=[];
  amortecedorultima=[];
  amortecedordata=[];
  amortecedorkm=[];



  constructor(
    private authService : AuthService,
    private formBuilder: FormBuilder,
    private proprietarioServ: ProprietarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    moment.locale('pt-BR');

    this.oleoultima=[];
    this.oleodata=[];
    this.oleokm=[];
    this.filtroultima=[];
    this.filtrodata=[];
    this.filtrokm=[];
    this.injecaoultima=[];
    this.injecaodata=[];
    this.injecaokm=[];
    this.bicoultima=[];
    this.bicodata=[];
    this.bicokm=[];
    this.velasultima=[];
    this.velasdata=[];
    this.velaskm=[];
    this.freiosultima=[];
    this.freiosdata=[];
    this.freioskm=[];
    this.correiaultima=[];
    this.correiadata=[];
    this.correiakm=[];
    this.suspensaoultima=[];
    this.suspensaodata=[];
    this.suspensaokm=[];
    this.pneusultima=[];
    this.pneusdata=[];
    this.pneuskm=[];
    this.rodizioultima=[];
    this.rodiziodata=[];
    this.rodiziokm=[];
    this.alinhamentoultima=[];
    this.alinhamentodata=[];
    this.alinhamentokm=[];
    this.amortecedorultima=[];
    this.amortecedordata=[];
    this.amortecedorkm=[];
    this.processing=true;
    this.proprietarioId = this.authService.getUsuarioIdFromStorage();
    this.subsPesq = this.proprietarioServ
      .getDadosProprietario(this.proprietarioId)
      .subscribe(data => {

        if (!this.authService.verTokenValido(data.tokeninvalido) ){
          this.message = 'Usuário desconectado. Por favor, logue novamente.';
          this.messageClass = "alert alert-danger";
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
          return;
        }
        this.setServico(data.servicorealizados)
        this.proprietario     = data.proprietario;
        this.servicosrealizado = data.servicorealizados;
        this.processing = false;
      });
  }



  setServico(veiculo){
    if (!veiculo) return;

    for (let cVei = 0; cVei<veiculo.length;cVei++){
      for (let cTs = 0;cTs < veiculo[cVei].veiculo.tiposervicos.length;cTs++){
        let oTipoServico = veiculo[cVei].veiculo.tiposervicos[cTs];
        let dataultimarealizacao = "Não informado"
        let proximatrocadata = "Não informado"
        let proximatrocakm = "Não informado";

        if (oTipoServico.dataultimarealizacao){
          dataultimarealizacao = moment(oTipoServico.dataultimarealizacao).format('DD/MM/YYYY');;
        }
        if (oTipoServico.proximatrocadata) {
          proximatrocadata  = moment(oTipoServico.proximatrocadata).format('DD/MM/YYYY');
        }
        if (oTipoServico.proximatrocakm) {
          proximatrocakm  = oTipoServico.proximatrocakm;
        }
        if (oTipoServico.tiposervicoid === 1) {
          this.oleoultima[cVei] = dataultimarealizacao;
          this.oleodata[cVei]   = proximatrocadata;
          this.oleokm[cVei]     = proximatrocakm;
        }

        if (oTipoServico.tiposervicoid === 2) {
          this.filtroultima[cVei] = dataultimarealizacao;
          this.filtrodata[cVei]   = proximatrocadata;
          this.filtrokm[cVei]     = proximatrocakm;
        }
        // /*if (oTipoServico._id === "1") {
        //   this.injecaodata="";
        //   this.injecaokm="";
        // }*/

        if (oTipoServico.tiposervicoid === 4) {
          this.bicoultima[cVei] = dataultimarealizacao;
          this.bicodata[cVei]   = proximatrocadata;
          this.bicokm[cVei]     = proximatrocakm;
        }
        if (oTipoServico.tiposervicoid === 5) {
          this.velasultima[cVei] = dataultimarealizacao;
          this.velasdata[cVei]   = proximatrocadata;
          this.velaskm[cVei]     = proximatrocakm;
        }

        if (oTipoServico.tiposervicoid === 6) {
          this.freiosultima[cVei] = dataultimarealizacao;
          this.freiosdata[cVei]   = proximatrocadata;
          this.freioskm[cVei]     = proximatrocakm;
        }
        if (oTipoServico.tiposervicoid === 7) {
          this.correiaultima[cVei] = dataultimarealizacao;
          this.correiadata[cVei]   = proximatrocadata;
          this.correiakm[cVei]     = proximatrocakm;

        }
        if (oTipoServico.tiposervicoid === 8) {
          this.suspensaoultima[cVei] = dataultimarealizacao;
          this.suspensaodata[cVei]   = proximatrocadata;
          this.suspensaokm[cVei]     = proximatrocakm;
        }

        if (oTipoServico.tiposervicoid === 9) {
          this.pneusultima[cVei] = dataultimarealizacao;
          this.pneusdata[cVei]   = proximatrocadata;
          this.pneuskm[cVei]     = proximatrocakm;
        }

        if (oTipoServico.tiposervicoid === 10) {
          this.rodizioultima[cVei] = dataultimarealizacao;
          this.rodiziodata[cVei]   = proximatrocadata;
          this.rodiziokm[cVei]     = proximatrocakm;
        }
        if (oTipoServico.tiposervicoid === 11) {
          this.alinhamentoultima[cVei] = dataultimarealizacao;
          this.alinhamentodata[cVei]   = proximatrocadata;
          this.alinhamentokm[cVei]     = proximatrocakm;
        }
        if (oTipoServico.tiposervicoid === 12) {
          this.amortecedorultima[cVei] = dataultimarealizacao;
          this.amortecedordata[cVei]   = proximatrocadata;
          this.amortecedorkm[cVei]     = proximatrocakm;
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.subsPesqParamPropr) this.subsPesqParamPropr.unsubscribe();
    if (this.subsPesq) this.subsPesq.unsubscribe();
  }
  irProfile(){
    this.router.navigate(['/profile', this.proprietarioId,'areaproprietario']);
  }
  irVeiculo(veiculoid){
    this.router.navigate(['/areaproprietario/veiculo',veiculoid]);
  }
}
