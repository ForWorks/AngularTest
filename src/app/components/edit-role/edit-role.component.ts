import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent {

  @Input() role: Role
  @Input() users: User[]
  @Output() close = new EventEmitter<void>()

  constructor(private roleService: RoleService, private userService: UserService) {}

  editRole(roleName: string) {
    if(this.roleService.roleNameIsValid(roleName)) {
      var oldName = this.role.name
      this.role.name = roleName
      this.roleService
        .editRole(this.role)
        .subscribe(() => {
          this.users.forEach((user) => {
            user.roles.forEach((role) => {
            if(role.name == oldName) {
              role.name = roleName              
            }
          })
          this.userService.editUser(user).subscribe()
        })
        this.close.emit()
      });
    }
    else {
      alert("Check the name you entered.")
    }
  }
}
