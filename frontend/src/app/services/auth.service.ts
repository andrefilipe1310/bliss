import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/auth.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = ""

  constructor(private httpClient: HttpClient) { }

  public login(user: User): Observable<string> {

    return new Observable<string>((observable) => {
      setTimeout(() => {
        observable.next("Bearer fmsjirgbsdyhigbnisnfisdfnisdufnsidufnisduf")
        observable.complete()
      }, 2000);
    })

  }
}
