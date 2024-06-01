import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({providedIn:'root'})
export class UserService{
  private jsonUrl = 'assets/usuarios.json'

  constructor(private http: HttpClient){
  }
  getUsers(): Observable <User[]>{
    return this.http.get<User[]>(this.jsonUrl)
  }
}
