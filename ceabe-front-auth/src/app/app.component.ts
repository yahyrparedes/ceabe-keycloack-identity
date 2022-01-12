import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ceabe Essalud';

  username: string;
  isLogged: boolean;
  isAdmin: boolean;
  token: string;

  constructor() {

  }


}
