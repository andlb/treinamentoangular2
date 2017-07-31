import { ErroMessage } from './../../../share/erro.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EmpresaService } from './../empresa.service';

@Component({
  selector: 'app-empresalista',
  templateUrl: './empresalista.component.html',
  styleUrls: ['./empresalista.component.css']
})
export class EmpresalistaComponent implements OnInit, OnDestroy {
  httpSubs: Subscription;
  erroMessage:ErroMessage
  empresas = [];
  constructor(
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.httpSubs = this.empresaService.getTodasEmpresas().subscribe(
      data => {
        this.empresas = data.empresas;
      });

  }

  ngOnDestroy(): void {
    if (this.httpSubs) this.httpSubs.unsubscribe();

  }
  onEditItem(empresaid){
    //TODO: Fazer uma chamada para carregar a empresa com o id.
  }

}
