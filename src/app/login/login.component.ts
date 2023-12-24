import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formLogin! : FormGroup;
isAuthenticated : boolean = false;
roles :any;
username: any;

  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private router : Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.formLogin=this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  handleLogin() {
  let username :string = this.formLogin.value.username;
  let password :string = this.formLogin.value.password;
  this.authService.login(username, password).subscribe({
    next : (data)=>{
      this.authService.loadProfile(data);
      this.ngZone.run(async () => {
        try {
          await this.router.navigateByUrl("/admin");
        } catch (error) {
          console.error('Error during navigation:', error);
        }
      });    },
    error : (err)=>{
      alert("Error Login");
      console.log(err);
    }
  })
  }
}
