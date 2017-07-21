import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  domain = environment.domain;  
  
  constructor(
    private http: Http
  ) { }
  
  registerUser(user){    
    return this.http.post(this.domain+'/authentication/register',user).map(res => res.json());    
  }
  
  checkEmail(email){
    return this.http.get(this.domain+'/authentication/checkEmail/'+email).map(res => res.json());    

  }



}
