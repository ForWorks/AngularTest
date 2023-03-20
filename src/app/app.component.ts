import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { Role } from 'src/app/models/Role';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserRefDirective } from './components/edit-user/user-ref.directive';
import { EditRoleComponent } from './components/edit-role/edit-role.component';
import { RoleRefDirective } from './components/edit-role/role-ref.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild(UserRefDirective) userRefDirective: UserRefDirective
  @ViewChild(RoleRefDirective) roleRefDirective: RoleRefDirective

  users: User[] = []
  roles: Role[] = []

  constructor(private userService: UserService, private roleService: RoleService) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe((users: User[]) => this.users = users)
    this.roleService
      .getRoles()
      .subscribe((roles: Role[]) => this.roles = roles)
  }

  addUser(userName: string) {
    if(this.userService.userNameIsValid(userName)) {
      let user = {name: userName, roles: []}
      this.userService
        .createUser(user)
        .subscribe((user: User) => this.users.push(user))
    }
    else {
      alert("Check the name you entered.")
    }   
  }

  addRole(roleName: string) {
    if(this.roleService.roleNameIsValid(roleName)) {      
      let role = {name: roleName}
      this.roleService
        .createRole(role)
        .subscribe((role: Role) => this.roles.push(role))
    }
    else {
      alert("Check the name you entered.")
    }
  }

  deleteRole(role: Role) {
    this.roleService
      .deleteRole(role.id)
      .subscribe(() => {
        this.deleteItem(this.roles, role.id)
        for(let i = 0; i < this.users.length; i++) {
          for(let j = 0; j < this.users[i].roles.length; j++) {   
            if(this.users[i].roles[j].id == role.id) {
              this.users[i].roles.splice(j, 1)
              break
            }      
          }
          this.userService
            .editUser(this.users[i])
            .subscribe(() => {})
        }   
      });
  }

  deleteUser(userId?: string) {
    this.userService
      .deleteUser(userId)
      .subscribe(() => this.deleteItem(this.users, userId))
  }

  showUserModal(user: User) {
    const component = this.userRefDirective.containerRef.createComponent(EditUserComponent)
    component.instance.user = user
    component.instance.roles = this.roles
    component.instance.close.subscribe(() => {
      this.userRefDirective.containerRef.clear()
    })
  }

  showRoleModal(role: Role) {
    const component = this.roleRefDirective.containerRef.createComponent(EditRoleComponent)
    component.instance.users = this.users
    component.instance.role = role
    component.instance.close.subscribe(() => {
      this.roleRefDirective.containerRef.clear()
    })
  }

  private deleteItem<T extends Role | User>(collection: T[], itemId?: string) {
    for(let i = 0; i < collection.length; i++) {
      if(collection[i].id == itemId) {           
        collection.splice(i, 1)
        return
      }
    }
  }
}