import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url = "Users";

  constructor(private httpClient: HttpClient) {}

  public getUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createUser(user: User) : Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/${this.url}`, user); 
  }

  public deleteUser(id: string) : Observable<User> {
    return this.httpClient.delete<User>(`${environment.apiUrl}/${this.url}/id?id=${id}`); 
  }
 }
