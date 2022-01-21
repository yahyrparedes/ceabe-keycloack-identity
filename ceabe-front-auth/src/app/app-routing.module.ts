import {SignupGuard} from './guards/signup.guard';
import {SignupComponent} from './signup/signup.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {SupplierGuard} from "./guards/supplier.guard";


const routes: Routes = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: 'register', component: SignupComponent, canActivate: [SignupGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [SupplierGuard] /*, data: {requiredRoles: ['admin']}*/},
  // {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
