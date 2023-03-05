import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  addUser(userName) {
    // проверка данных, регулярка и защита от html инъекций
    this.users.push({id: 3, name: userName, roles: []});
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

  private url = "User"

  constructor(private http: HttpClient) {

  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  ngOnInit() {
    this.getUsers().subscribe((result: User[]) => this.users = result);

    this.roles.push({id: 0, name: 'Роль1'});
    this.roles.push({id: 1, name: 'Роль2'});
    this.roles.push({id: 2, name: 'Роль3'});
  }
}

interface User {
	id: number,
	name: string,
  roles: Role[],
}

interface Role {
  id: number,
  name: string,
}
