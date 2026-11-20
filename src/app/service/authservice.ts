import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin, Iregister, IreturnMessage } from '../interface/iregister';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private baseUrl='https://localhost:7164/api';

  constructor(private http:HttpClient){}

  registerUser(data:Iregister):Observable<IreturnMessage>
  {
    return this.http.post<IreturnMessage>(`${this.baseUrl}/Auth/Register`,data);
  }

  loginUser(data:Ilogin):Observable<IreturnMessage>
  {
    return this.http.post<IreturnMessage>(`${this.baseUrl}/Auth/Login`,data);
  }
   getRole(): string | null {
    return sessionStorage.getItem('role');
  }
}
