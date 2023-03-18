import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/models/Role';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  private url = "Roles";

  constructor(private httpClient: HttpClient) {}

  public getRoles() : Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createRole(role: Role) : Observable<Role> {
    return this.httpClient.post<Role>(`${environment.apiUrl}/${this.url}`, role); 
  }

  public deleteRole(id: string) : Observable<Role> {
    return this.httpClient.delete<Role>(`${environment.apiUrl}/${this.url}/id?id=${id}`); 
  }

  public editRole(role: Role) : Observable<Role> {
    return this.httpClient.put<Role>(`${environment.apiUrl}/${this.url}/id?id=${role.id}`, role); 
  }
}
