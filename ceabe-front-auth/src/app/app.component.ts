import {Component, OnInit} from '@angular/core';
import {SignupComponent} from "./signup/signup.component";
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {LoginService} from "./services/login.service";
import {SessionService} from "./services/session.service";
import {environment} from "../environments/environment";

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
  name: string;
  token: string;

  constructor(private oauthService: OAuthService,
              private sessionService: SessionService,
              private loginService: LoginService,) {
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
        console.log('validation sesion')
        if (this.oauthService.getIdentityClaims()) {
          console.log(this.oauthService.getIdentityClaims())
          console.log(this.oauthService.loadUserProfile())
          this.isLogged = this.loginService.getIsLogged();
          this.isAdmin = this.loginService.getIsAdmin();
          this.name = this.loginService.getName();
          this.token = this.loginService.getToken();
          this.username = this.loginService.getUsername();
          this.sessionService.session(this.isLogged, this.username, this.name);
        } else {
          console.log('sin session')
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
    // Suscribe to token events
    // Falta testearlo por que genera un bucle
    // this.oauthService.events
    //   .pipe(filter((e: any) => e.type === "token_received"))
    //   .subscribe(({type}) => {
    //     // this.oauthService.refreshToken();
    //   });

  }


}
