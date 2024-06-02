import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({providedIn:'root'})
export class UserService{
  private jsonUrl = 'http://localhost:3000'

  constructor(private http: HttpClient){
  }

  getUsers(): Observable <User[]>{
    const url = `${this.jsonUrl}/users`
    return this.http.get<User[]>(url)
  }

  saveUsers(object: User): Observable <User>{
    const url = `${this.jsonUrl}/users`
    return this.http.post<User>(url, object)
  }
}
