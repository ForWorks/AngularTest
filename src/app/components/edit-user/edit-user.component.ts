import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  @Input() user: User;
  @Input() roles: Role[];
  @Output() close = new EventEmitter<void>()

  constructor() {}

  editUser(userName: string) {
    this.user.name = userName
    console.log(this.user)
    return false
  }

  addRole(roleName: string) {
    for(let i = 0; i < this.roles.length; i++) {
      if(this.roles[i].name == roleName) {
        this.user.roles.push(this.roles[i])
        break
      }
    }
    return false
  }
}
