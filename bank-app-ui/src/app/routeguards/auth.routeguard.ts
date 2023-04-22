import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { User } from '../model/user.model';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable()
export class AuthActivateRouteGuard extends KeycloakAuthGuard {
     user = new User();
     public userProfile: KeycloakProfile | null = null;

     constructor(
      protected override readonly router:Router,
      protected readonly keycloak: KeycloakService
     ) {
        super(router,keycloak);
     }

     public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       if(!this.authenticated) {
        await this.keycloak.login({
          redirectUri: window.location.origin + '/dashboard'
        });
       } else {
        this.userProfile = await this.keycloak.loadUserProfile();
        this.user.authStatus = 'AUTH';
        this.user.name = this.userProfile.firstName || "";
        this.user.email = this.userProfile.email || "";
        window.localStorage.setItem("userdetails",JSON.stringify(this.user));
       }

       const requiredRoles = route.data['roles'];

       if(!(requiredRoles instanceof Array) || requiredRoles.length == 0) {
          return true;
       }

       return requiredRoles.some((role) => this.roles.includes(role));
     }
}
