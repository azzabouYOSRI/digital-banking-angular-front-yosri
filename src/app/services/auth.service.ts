import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: string;

private accessTokenPromise: Promise<void> = Promise.resolve();

  constructor(
    private http: HttpClient,
    private router :Router
  ) { }

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest' // Indicate an Ajax request
      })
    };

    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post("http://localhost:8085/auth/login", params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    const jwtPayloadBase64 = data['access_token'].split('.')[1];
    const decodedPayload = atob(jwtPayloadBase64);
    const jwtDecoded = JSON.parse(decodedPayload);

    this.accessToken = data['access_token'];
    this.username = jwtDecoded.sub;
    this.roles = jwtDecoded.scope;
        window.localStorage.setItem("jwt-token",this.accessToken)
  }

  getAccessToken(): Promise<string> {
    if (!this.accessTokenPromise) {
      this.accessTokenPromise = new Promise<void>((resolve) => {
        this.loadProfileCallback = () => {
          resolve();
        };
      });
    }

    return this.accessTokenPromise.then(() => this.accessToken);
  }

  private loadProfileCallback: () => void = () => {};

  private triggerLoadProfileCallback() {
    this.loadProfileCallback();
    this.loadProfileCallback = () => {};
  }

  logout() {
    this.isAuthenticated=false;
    this.accessToken="";
    this.username="";
    this.roles="";
    this.router.navigateByUrl("/login")
    window.localStorage.removeItem("jwt-token")
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem("jwt-token");
    if (token){
      this.loadProfile({"access-token":token});
      this.router.navigateByUrl("/admin/customers")
    }
  }
}
