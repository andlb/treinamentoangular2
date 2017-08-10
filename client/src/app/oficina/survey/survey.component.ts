import { Subject } from "rxjs/Subject";
import { OficinaService } from "./../oficina.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.css"]
})
export class SurveyComponent implements OnInit {
  private httpSubs: Subscription;
  private subsPesquisaAtendimento: Subscription;
  private subsPesquisa: Subscription;
  teste = true;
  processing = false;
  atendimentoid;
  perguntas = [];
  ordemservicos = [];
  messageClass;
  message;
  constructor(
    private oficinaService: OficinaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.perguntas = [];
    this.subsPesquisaAtendimento = this.route.params.subscribe(
      (params: Params) => {
        this.atendimentoid = params.id;
        if (this.atendimentoid) {
          this.processing = true;
          this.subsPesquisa = this.oficinaService
            .getSurvey(this.atendimentoid)
            .subscribe(data => {
              if (!data.success) {
                this.messageClass = "alert alert-danger";
                this.message = data.message;
              } else {
                this.perguntas = data.perguntas;
              }
              this.processing = false;
            });
        }
      }
    );
  }

  limpar() {
    this.perguntas = [];
  }

  ngOnDestroy(): void {
    if (this.httpSubs) this.httpSubs.unsubscribe();
  }

  setRespostaText(event, index) {
    console.log(event.target.value);
    this.perguntas[index].resposta = event.target.value;

  }

  setResposta(valor, index) {
    this.perguntas[index].resposta = valor;
  }

  enviar(){
    this.processing = true;
    let respostas = []
    for (var c=0;c<this.perguntas.length;c++) {
      respostas[c] = {
        ordemservicoid: this.atendimentoid,
        perguntaid: this.perguntas[c]._id,
        tipo: this.perguntas[c].tipo,
        descricao: this.perguntas[c].descricao,
        resposta: this.perguntas[c].resposta
      }
    }
    let resposta = JSON.stringify(respostas);
    let body = {
      ordemservicoid:this.atendimentoid,
      json:respostas
    }
    this.oficinaService.enviaQuestionario(body).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {
        this.messageClass = 'alert alert-success';
        this.message = 'Dados salvos com sucesso';
        setTimeout(() => {
          this.processing = false; // Enable submit button
          this.router.navigate(['centroautomotivo/lista']);
        }, 2000);

      }
    });
  }
}
