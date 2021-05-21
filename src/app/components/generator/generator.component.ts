import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {
  
  title = 'Generator default';
  qr = '';
  name = String
  id = String;
  phone = Number;
  elementType = 'url';

  constructor()
   {
    const curr_time = new Date().getTime();
    const info = {
      name: this.name,
      id: this.id,
      phone: this.phone,
      time: curr_time
    }
    const infoString = JSON.stringify(info);

    this.qr = infoString;
  } 

}
