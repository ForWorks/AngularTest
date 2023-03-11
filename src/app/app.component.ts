import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { Role } from 'src/app/models/Role';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RefDirective } from './components/ref.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild(RefDirective) refDirective: RefDirective

  users: User[] = []
  roles: Role[] = []

  constructor(private userService: UserService, private roleService: RoleService) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe((users: User[]) => this.users = users);
    this.roleService
      .getRoles()
      .subscribe((roles: Role[]) => this.roles = roles);
  }

  showUserModal(user) {
    const component = this.refDirective.containerRef.createComponent(EditUserComponent)
    component.instance.user = user
    component.instance.roles = this.roles
    component.instance.close.subscribe(() => {
      this.refDirective.containerRef.clear()
    })
  }

  addUser(userName: string) {
    // проверка данных, регулярка и защита от html инъекций
    let user = {name: userName, roles: []}
    this.userService
      .createUser(user)
      .subscribe((user: User) => this.users.push(user));
      return false;
  }

  addRole(roleName: string) {
    let role = {name: roleName}
    this.roleService
      .createRole(role)
      .subscribe((role: Role) => this.roles.push(role));
    return false;
  }

  deleteRole(roleId) {
    this.roleService
      .deleteRole(roleId)
      .subscribe(() => this.deleteItem(this.roles, roleId));
      return false;
  }

  deleteUser(userId) {
    this.userService
      .deleteUser(userId)
      .subscribe(() => this.deleteItem(this.users, userId));
      return false;
  }

  private deleteItem<T extends Role | User>(collection: T[], itemId: string) {
    for(let i = 0; i < collection.length; i++) {
      if(collection[i].id == itemId) {           
        collection.splice(i, 1);
        return;
      }
    }
  }
}