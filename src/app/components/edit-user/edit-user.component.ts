import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  @Input() user: User
  @Input() roles: Role[] = []
  @Output() close = new EventEmitter<void>()

  selectedRoles: SelectedRole[] = []

  constructor(private userService: UserService) {}

  ngOnInit() {    
    this.user.roles.forEach((userRole) => {
      this.selectedRoles.push({id: userRole.id, name: userRole.name, isSelected: true})
    })
  }

  editUser(userName: string) {
    this.user.name = userName
    this.user.roles = []
    this.selectedRoles.forEach((role) => {
      if(role.isSelected) {
        this.user.roles.push({id: role.id, name: role.name})
      }
    })
    this.userService
      .editUser(this.user)
      .subscribe(() => this.close.emit());
    return false
  }

  addRole(roleName: string) {
    var role = this.selectedRoles.find(role => role.name == roleName)
    if(role == undefined) {
      this.roles.forEach((it) => {
        if(it.name == roleName) {
          this.selectedRoles.push({id: it.id, name: it.name, isSelected: true})         
        }
      })
    }
    else {
      console.log("Error. User already has this role.")
    }
    return false
  }
}

interface SelectedRole {
  id?: string,
  name: string,
  isSelected: boolean,
}
