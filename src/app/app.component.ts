import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { Role } from 'src/models/Role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  addUser(userName) {
    // проверка данных, регулярка и защита от html инъекций
    return false;
  }

  addRole(userRole) {
    this.roles.push({id: 3, name: userRole});
    return false;
  }

  deleteRole(roleId) {
    for(let i = 0; i < this.roles.length; i++) {
      if(this.roles[i].id == roleId) {
        this.roles.splice(i, 1);
        break;
      }
    }
  }

  deleteUser(userId) {
    for(let i = 0; i < this.users.length; i++) {
      if(this.users[i].id == userId) {
        this.users.splice(i, 1);
        break;
      }
    }
  }

  users: User[] = [];
  roles: Role[] = [];

  private usersUrl = "Users";
  private rolesUrl = "Roles";

  constructor(private http: HttpClient) {}

  public getCollection<T>(url: string): Observable<T[]> {    
    return this.http.get<T[]>(`${environment.apiUrl}/${url}`);  
  }

  ngOnInit() {
    this.getCollection<Role>(this.rolesUrl).subscribe((result: Role[]) => this.roles = result);
    this.getCollection<User>(this.usersUrl).subscribe((result: User[]) => this.users = result);
  }
}