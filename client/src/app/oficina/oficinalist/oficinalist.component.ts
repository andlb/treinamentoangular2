import { SurveyComponent } from './../survey/survey.component';
import { OficinaService } from './../oficina.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-oficinalist',
  templateUrl: './oficinalist.component.html',
  styleUrls: ['./oficinalist.component.css']
})
export class OficinalistComponent implements OnInit {
  private httpSubs: Subscription;
  private subsEdit: Subscription;
  private edit=false;
  messageClass = "";
  message = "";
  ordemservicos = [];

  constructor(
    private oficinaService: OficinaService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.subsEdit = this.route.params.subscribe(
      (params: Params) => {
        if (params.edit) {
          this.edit = true;
        }
      }
    );
    this.httpSubs = this.oficinaService.getTodosVeiculos().subscribe((data) => {
      if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
      }
      this.ordemservicos = data.ordensservico;
    });
  }

  ngOnDestroy(): void {
    if (this.httpSubs) this.httpSubs.unsubscribe();
    if (this.subsEdit) this.subsEdit.unsubscribe();
  }

  onEditItem(ordemservicoid) {
    if (this.edit) {
      this.router.navigate(['centroautomotivo/cadastro',ordemservicoid]);
    }else{
      this.router.navigate(['centroautomotivo/survey',ordemservicoid]);
    }
  }

  onNovo(){
    this.router.navigate(['centroautomotivo/cadastro']);
  }
}
