import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {SessionService} from "../services/session.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLogged: boolean;
  username: string;
  businessName: String;

  constructor(private loginService: LoginService,
              private router: Router,
              private sessionService: SessionService) {
    console.log('constructor profile');
  }

  ngOnInit(): void {
    console.log('ngOnInit profile');
    this.sessionService.getSession().subscribe(res => {
        this.isLogged = res[`session`];
        this.username = res[`username`];
        this.businessName = res[`name`];
      },
      err => console.log(err));
    this.isLogged = this.loginService.getIsLogged();
    this.businessName = this.loginService.getName();
    this.username = this.loginService.getUsername();
  }

}
