import { Subject } from 'rxjs/Subject';
import { OficinaService } from './../oficina.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  private httpSubs: Subscription;
  private subsPesquisaAtendimento:Subscription;
  private subsPesquisa:Subscription;

  processing=false;
  atendimentoid;
  survey=[];
  ordemservicos = [];
  messageClass;
  message;
  constructor(
    private oficinaService: OficinaService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.survey=[];
    this.subsPesquisaAtendimento = this.route.params
      .subscribe(
        (params: Params) => {
          this.atendimentoid = params.id;
          if (this.atendimentoid) {
            this.processing = true;
            this.subsPesquisa = this.oficinaService.getSurvey(this.atendimentoid).subscribe((data) => {
              if (!data.success){
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
              }else {
                this.survey = data.perguntas;
                console.log(this.survey);
              }
              this.processing = false;
            });
          }
        }
      );
  }
  limpar(){
    this.survey = [];
  }

  ngOnDestroy(): void {
    if (this.httpSubs) this.httpSubs.unsubscribe();
  }

}
