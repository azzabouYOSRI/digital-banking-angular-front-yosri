import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  sanitizeInput(input: string): string {
    // Remove characters that may be used in SQL injection
    const sanitizedInput = input.replace(/[\;\+\-\*\/\=\>\<\'\"]/g, '');

    return sanitizedInput;
  }

  public saveCustomer(user: User):Observable<User>{
    return this.http.post<User>(environment.backendHost+"/register",user);
  }
}
