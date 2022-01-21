import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {LoginService} from "../services/login.service";


@Injectable({
  providedIn: 'root'
})
export class SupplierGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const requiredRoles = next.data.requiredRoles;
    if (!this.loginService.getIsLogged()) {
      console.log('if one')
      // this.router.navigate(['/']);
      // this.loginService.login();
      return false;
    }
    const realRol = this.loginService.getIsAdmin() ? 'admin' : 'user';
    if (requiredRoles.indexOf(realRol) === -1) {
      console.log('if two')
      // this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
