import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {
  constructor(private readonly pS:PersonaService){
  }
  user!:Persona;
  users : Persona[]= [];
 /* ngOnInit(): void {
    this.pS.getUsers().subscribe(data =>{
      this.users = [...data];
    });

    this.initPersona();
  }
*/
  initPersona(){
    this.pS.getUser().subscribe(data =>{
      this.user = data;
      console.log(data);
      
    })
  }


}
