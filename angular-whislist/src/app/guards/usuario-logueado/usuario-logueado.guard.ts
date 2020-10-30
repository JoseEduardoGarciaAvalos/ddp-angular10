import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoGuard implements CanActivate {
  constructor(private authSservice:AuthService){}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    const isLoggedIn = this.authSservice.isLoggedIn();
    console.log("canActivate", isLoggedIn);
    return isLoggedIn;
  }
  
}
