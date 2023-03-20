import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/models/Role';
import { UserRefDirective } from '../components/edit-user/user-ref.directive';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  @ViewChild(UserRefDirective) userRefDirective: UserRefDirective

  private url = "Roles"

  constructor(private httpClient: HttpClient) {}

  public getRoles() : Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${environment.apiUrl}/${this.url}`)
  }

  public createRole(role: Role) : Observable<Role> {
    return this.httpClient.post<Role>(`${environment.apiUrl}/${this.url}`, role)
  }

  public deleteRole(id?: string) : Observable<Role> {
    return this.httpClient.delete<Role>(`${environment.apiUrl}/${this.url}/id?id=${id}`)
  }

  public editRole(role: Role) : Observable<Role> {
    return this.httpClient.put<Role>(`${environment.apiUrl}/${this.url}/id?id=${role.id}`, role)
  }

  public roleNameIsValid(name: string) : boolean {
    var reg = RegExp('[a-zA-Z]{4,20}')
    return reg.test(name)
  }
}
