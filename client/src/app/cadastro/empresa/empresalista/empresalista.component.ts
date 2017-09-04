import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EmpresaService } from './../empresa.service';
import { ErroMessage } from './../../../share/erro.model';


@Component({
  selector: 'app-empresalista',
  templateUrl: './empresalista.component.html',
  styleUrls: ['./empresalista.component.css']
})
export class EmpresalistaComponent implements OnInit, OnDestroy {
  private httpSubs: Subscription;
  private subscription:Subscription;
  erroMessage:ErroMessage
  empresas = [];
  constructor(
    private empresaService: EmpresaService,
    private router: Router,
  ) { }

  ngOnInit() {

    console.log('entrou ak');
    this.httpSubs = this.empresaService.getTodasEmpresas().subscribe(
      (data) => {
        console.log(data);
        this.empresas = data.empresas;
      });
    this.subscription = this.empresaService.empresaChanged.subscribe(
      (acao: any) => {
        if (acao === "novo"){
          this.router.navigate(["/empresa/cadastro"],{ skipLocationChange: true });
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.httpSubs) this.httpSubs.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();


  }
  onEditItem(empresaid){
    //TODO: Fazer uma chamada para carregar a empresa com o id.
    this.router.navigate(['/empresa/cadastro',empresaid],{ skipLocationChange: true });
  }

}
