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
import {ContactComponent} from './contact/contact.component';
import {OAuthModule} from "angular-oauth2-oidc";
import {environment} from "../environments/environment";
import {ProfileComponent} from './profile/profile.component';
import {RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS} from "ng-recaptcha";

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
    RecaptchaFormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.url, environment.service],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    RxFormBuilder,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: "6Lcz1xIdAAAAALCm7x_AWRKAykjLzYKgTQJ0Xjej"}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
