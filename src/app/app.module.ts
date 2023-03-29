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


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    HeaderComponent,
    AboutMeComponent,
    EducationComponent,
    ExperienceComponent,
    AbilitiesComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
