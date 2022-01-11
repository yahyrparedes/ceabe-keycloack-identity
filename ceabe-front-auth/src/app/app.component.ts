import {LoginService} from './services/login.service';
import {MessageService} from './services/message.service';
import {AuthConfig, NullValidationHandler, OAuthService,} from 'angular-oauth2-oidc';
import {Component} from '@angular/core';
import {filter} from "rxjs/operators";

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

  constructor(
    private oauthService: OAuthService,
    private messageService: MessageService,
    private loginService: LoginService,
  ) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/ceabe',
    redirectUri: window.location.origin,
    clientId: 'ceabe-client-auth',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    // this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();


    //Suscribe to token events
    this.oauthService.events
      .pipe(filter((e: any) => e.type === "token_received"))
      .subscribe(({type}) => {
        this.oauthService.refreshToken();
        // this.loginService.handleNewToken();
      });

    // this.oauthService.setupAutomaticSilentRefresh();
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
    this.oauthService.loadDiscoveryDocumentAndLogin()
      // .then(() => this.oauthService.tryLogin())
      .then(
        (isLoggedIn) => {
          if (isLoggedIn) {
            this.isLogged = this.loginService.getIsLogged();
            this.isAdmin = this.loginService.getIsAdmin();
            this.username = this.loginService.getUsername();
            this.token = this.loginService.getToken();
            this.messageService.sendMessage(this.loginService.getUsername());
            this.oauthService.setupAutomaticSilentRefresh();
          } else {
            this.oauthService.initImplicitFlow();
          }
        }, (error) => {
          console.log({error});
          if (error.status === 400) {
            location.reload();
          }
        }
        // if (this.oauthService.getIdentityClaims()) {
        //   this.isLogged = this.loginService.getIsLogged();
        //   this.isAdmin = this.loginService.getIsAdmin();
        //   this.username = this.loginService.getUsername();
        //   this.token = this.loginService.getToken();
        //   this.messageService.sendMessage(this.loginService.getUsername());
        // }
      );
  }

}
