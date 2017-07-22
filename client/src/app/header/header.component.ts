import { FlashMessagesService } from 'angular2-flash-messages';

import { Component, OnInit } from '@angular/core';
import { AuthService} from '../autenticar/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService

    

    ) { }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('Aplicação desconectada',{cssClass:'alert-info'});
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }


}
