import {SignupGuard} from './guards/signup.guard';
import {SignupComponent} from './signup/signup.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {path: '', component: SignupComponent}, /*canActivate: [SignupGuard]}, */
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
