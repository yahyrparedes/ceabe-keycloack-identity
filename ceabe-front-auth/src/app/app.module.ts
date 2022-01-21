import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuComponent} from './menu/menu.component';
import {SignupComponent} from './signup/signup.component';
import {AppRoutingModule} from "./app-routing.module";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RecaptchaModule} from "ng-recaptcha";
import {ContactComponent} from './contact/contact.component';
import {OAuthModule} from "angular-oauth2-oidc";
import {environment} from "../environments/environment";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignupComponent,
    ContactComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RecaptchaModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.url, environment.service],
        sendAccessToken: true
      }
    })
  ],
  providers: [RxFormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
