import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  login(user: string, pass: string) : boolean{
    if(user === "user" && pass === "password"){
      localStorage.setItem("username",user);
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("username");
  }

  
  getUser(){
    return localStorage.getItem("username");
  }

  isLoggedIn(): boolean{
    return this.getUser() !== null;
  }
}
