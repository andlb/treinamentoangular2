import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './autenticar/guards/auth.guard';
import { NoAuthGuard } from './autenticar/guards/notAuth.guard';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { SurveyComponent } from './survey/survey.component';
import { RegisterComponent } from './autenticar/register/register.component';
import { AuthService } from './autenticar/auth.service';
import { LoginComponent } from './autenticar/login/login.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ProfileComponent } from './cadastro/profile/profile.component';
import { EmpresaComponent } from './cadastro/empresa/empresa.component';
import { EmpresaService } from './cadastro/empresa/empresa.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ServiceComponent,
    SurveyComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EmpresaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard,NoAuthGuard,EmpresaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
