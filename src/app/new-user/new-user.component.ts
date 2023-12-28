import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {UserService} from "../services/user.service";
import {PasswordService} from "../services/password.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  newUserFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private userService:UserService, private router:Router,
              private passwordService: PasswordService ) { }

  ngOnInit(): void {
    this.newUserFormGroup=this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      username : this.fb.control(null,[Validators.required, Validators.email]),
      password : this.fb.control(null,[Validators.required, Validators.minLength(4),this.passwordService.passwordComplexityValidator()])
    });
  }

  handleSaveUser() {
    let user:User=this.newUserFormGroup.value;
  user.enabled=true;
  console.log(user);
    this.userService.saveCustomer(user).subscribe({
      next : data=>{
        alert("User has been successfully saved!");
        this.newUserFormGroup.reset();
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
