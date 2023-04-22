import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = new User();

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak : KeycloakService) {

  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if(this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.user.authStatus = 'AUTH';
      this.user.name = this.userProfile.firstName || "";
      window.localStorage.setItem("userdetails",JSON.stringify(this.user));
    }
    /*
    if(localStorage.getItem('userdetails')){
      this.user = JSON.parse(localStorage.getItem('userdetails')!);
    }
    */
  }
  public login() {
    this.keycloak.login();
  }
  public logout() {
    let redirectURI = "http://localhost:4200/home";
    this.keycloak.logout(redirectURI);
  }
}
