import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/interfaces.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private apiUrl: string = 'http://localhost:1111/users';

  //http object to connect to our custom api
  constructor(private http: HttpClient) { }

  //return all data on our api
  getApiData(): Observable<UserInterface[]>
  {
    return this.http.get<UserInterface[]>(this.apiUrl);
  }
}

