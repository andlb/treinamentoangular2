import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./autenticar/guards/auth.guard";
import { NoAuthGuard } from "./autenticar/guards/notAuth.guard";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";

import { RegisterComponent } from "./autenticar/register/register.component";
import { AuthService } from "./autenticar/auth.service";
import { LoginComponent } from "./autenticar/login/login.component";
import { FlashMessagesModule } from "angular2-flash-messages";
import { ProfileComponent } from "./cadastro/profile/profile.component";
import { EmpresaService } from "./cadastro/empresa/empresa.service";
import { OficinaService } from "./oficina/oficina.service";
import { ProprietarioService } from "./proprietario/proprietario.service";
import { EsquecisenhaComponent } from './autenticar/login/esquecisenha.component';
import { ReinicializarsenhaComponent } from './autenticar/login/reinicializarsenha.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EsquecisenhaComponent,
    ReinicializarsenhaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    EmpresaService,
    OficinaService,
    ProprietarioService,
    AuthGuard,
    NoAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
