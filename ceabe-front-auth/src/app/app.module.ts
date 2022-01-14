import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuComponent} from './menu/menu.component';
import {SignupComponent} from './signup/signup.component';
import {AppRoutingModule} from "./app-routing.module";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {AccordionModule} from "primeng/accordion";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {CardModule} from "primeng/card";
import {CaptchaModule} from "primeng/captcha";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    AccordionModule,
    CheckboxModule,
    DialogModule,
    CardModule,
    CaptchaModule,
  ],
  providers: [RxFormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
