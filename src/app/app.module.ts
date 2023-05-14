import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EducationComponent } from './components/about-me/education/education.component';
import { ExperienceComponent } from './components/about-me/experience/experience.component';
import { AbilitiesComponent } from './components/about-me/abilities/abilities.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenInterceptor } from './services/auth-interceptor/auth-interceptor.interceptor';
import { ModalComponent } from './components/modal/modal.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ProjectsComponent } from './components/about-me/projects/projects.component';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    HeaderComponent,
    AboutMeComponent,
    EducationComponent,
    ExperienceComponent,
    AbilitiesComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent,
    ModalFormComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({
      percent:80,
      radius:40,
      title:'Habilidad Comunicativa',
      titleFontSize:'5',
      titleFontWeight:'50',
      outerStrokeWidth:5,
      innerStrokeWidth:2,
      outerStrokeColor:'#ffffff',
      innerStrokeColor:'#000000',
      animation:true,
      animationDuration:1000,
      lazy:true,
      responsive:true,
      showUnits:false,
      showSubtitle:false,
      imageHeight:40,
      imageWidth:40
    }),
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
