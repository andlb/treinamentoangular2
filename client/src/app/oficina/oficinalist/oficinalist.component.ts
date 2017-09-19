
import { SurveyComponent } from './../survey/survey.component';
import { OficinaService } from './../oficina.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../../autenticar/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-oficinalist',
  templateUrl: './oficinalist.component.html',
  styleUrls: ['./oficinalist.component.css']
})
export class OficinalistComponent implements OnInit {
  private httpSubs: Subscription;
  private subsEdit: Subscription;
  edit=false;
  messageClass = "";
  message = "";
  ordemservicos = [];

  constructor(
    private oficinaService: OficinaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.oficinaService.getDadosUsuario();
    if (this.oficinaService.empresaid === "" ){
      this.message = 'Empresa não definida para o usuário.';
      this.messageClass = "alert alert-danger";
      return;
    }

    this.subsEdit = this.route.params.subscribe(
      (params: Params) => {
        if (params.edit) {
          this.edit = true;
        }
      }
    );


    this.httpSubs = this.oficinaService.getTodosVeiculos().subscribe((data) => {
      if (!this.authService.verTokenValido(data.tokeninvalido) ){
        this.message = 'Usuário desconectado. Por favor, logue novamente.';
        this.messageClass = "alert alert-danger";
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 2000);
        return;
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
