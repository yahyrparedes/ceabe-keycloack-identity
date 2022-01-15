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
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignupComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RecaptchaModule
  ],
  providers: [RxFormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
