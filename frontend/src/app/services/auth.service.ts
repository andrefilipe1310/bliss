import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = ""

  constructor(private httpClient:HttpClient) { }

  public login({email,password}:{email:string,password:string}):Observable<string>{

    return new Observable()

  }
}
