import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AgendamentoService } from './agendamento.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  placa;
  subsPesquisaPlaca:Subscription;
  subAgendamentoPlaca:Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agendamentoService:AgendamentoService
  ) {}

  ngOnInit() {
    this.subsPesquisaPlaca = this.route.params.subscribe(
      (params: Params) => {
        this.placa = params.placa;
        if (this.placa) {
          this. subAgendamentoPlaca = this.agendamentoService.agendarPlaca(this.placa).subscribe(data => {
            if (!data) {
              console.log('não foi retornado data ');
              return;
            }
          });
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subAgendamentoPlaca) this.subAgendamentoPlaca.unsubscribe();
    if (this.subsPesquisaPlaca) this.subsPesquisaPlaca.unsubscribe();

  }
}
