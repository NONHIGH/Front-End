import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


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
    FooterComponent,
    HomeComponent,
    LoginComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
