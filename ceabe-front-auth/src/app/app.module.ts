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
import {MdbAccordionModule} from 'mdb-angular-ui-kit/accordion';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import {MdbPopoverModule} from 'mdb-angular-ui-kit/popover';
import {MdbRadioModule} from 'mdb-angular-ui-kit/radio';
import {MdbRangeModule} from 'mdb-angular-ui-kit/range';
import {MdbRippleModule} from 'mdb-angular-ui-kit/ripple';
import {MdbScrollspyModule} from 'mdb-angular-ui-kit/scrollspy';
import {MdbTabsModule} from 'mdb-angular-ui-kit/tabs';
import {MdbTooltipModule} from 'mdb-angular-ui-kit/tooltip';
import {MdbValidationModule} from 'mdb-angular-ui-kit/validation';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalSignupComponent} from "./signup/modal.signup.component";

//https://mdbootstrap.com/
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignupComponent,
    ContactComponent,
    ProfileComponent,
    ModalSignupComponent,
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
    }),
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule
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
