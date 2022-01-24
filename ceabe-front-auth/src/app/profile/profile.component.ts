import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";
import {filter} from "rxjs";

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
              private userService: UserService,
              private oauthService: OAuthService,
              private router: Router) {
    this.configure();
  }


  authConfig: AuthConfig = {
    issuer: environment.keycloak,
    redirectUri: window.location.origin + '/profile',
    clientId: 'ceabe-client-auth',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    sessionChecksEnabled: true,
    showDebugInformation: true,
  };

  configure(): void {
    console.log("configure")
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => {
        if (this.oauthService.getIdentityClaims()) {
          // console.log(this.oauthService.getIdentityClaims())
          // console.log(this.oauthService.loadUserProfile())
          this.isLogged = this.loginService.getIsLogged();
          this.username = this.loginService.getUsername();
          this.businessName = this.loginService.getName();
        }
      }, (error) => {
        console.log({error});
        if (error.status === 400) {
          location.reload();
        }
      });

    // this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
    //   .then(() => {
    //     console.log('validate')
    //     if (this.oauthService.getIdentityClaims()) {
    //       console.log(this.oauthService.getIdentityClaims())
    //       console.log(this.oauthService.loadUserProfile())
    //       this.isLogged = this.loginService.getIsLogged();
    //       this.isAdmin = this.loginService.getIsAdmin();
    //       this.name = this.loginService.getName();
    //       this.token = this.loginService.getToken();
    //       this.username = this.loginService.getUsername();
    //       this.sessionService.session(this.isLogged, this.username, this.name);
    //     }else {
    //      console.log('sin session')
    //      }
    //   }, (error) => {
    //     console.log({error});
    //     if (error.status === 400) {
    //       location.reload();
    //     }
    //   });



  }

  ngOnInit(): void {
    this.isLogged = this.loginService.getIsLogged();
    this.businessName = this.loginService.getName();
    this.username = this.loginService.getUsername();

    if (this.isLogged == true) {
      console.log("user is logged")

      this.userService.getProfileSupplier(this.username).subscribe(response => {
        console.log(response)
      });
    }

    this.oauthService.events.pipe(filter(e => e.type === 'session_terminated')).subscribe(e => {
      console.debug('Your session has been terminated!');
    })

  }

}
