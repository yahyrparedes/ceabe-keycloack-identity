import {Component, OnInit} from '@angular/core';
import {SignupComponent} from "./signup/signup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }

  title = 'Ceabe Essalud';

  username: string;
  isLogged: boolean;
  isAdmin: boolean;
  token: string;

  constructor() {

  }


}
