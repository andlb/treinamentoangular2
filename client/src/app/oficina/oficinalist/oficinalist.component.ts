import { SurveyComponent } from './../survey/survey.component';
import { OficinaService } from './../oficina.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-oficinalist',
  templateUrl: './oficinalist.component.html',
  styleUrls: ['./oficinalist.component.css']
})
export class OficinalistComponent implements OnInit {
  private httpSubs: Subscription;

  veiculos = [];
  constructor(
    private oficinaService: OficinaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.httpSubs = this.oficinaService.getTodosVeiculos().subscribe((data) => {
      if (!data.success) {
        //console.log('Erro:'+data.message);
      }
      this.veiculos = data.veiculos
    });
  }

  ngOnDestroy(): void {
    if (this.httpSubs) this.httpSubs.unsubscribe();
  }
  onEditItem(empresaid) {
    //TODO: Fazer uma chamada para carregar a empresa com o id.
    this.router.navigate(['centroautomotivo/cadastro',empresaid]);
  }

}
