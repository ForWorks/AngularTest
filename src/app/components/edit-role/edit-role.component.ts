import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent {

  @Input() role: Role
  @Output() close = new EventEmitter<void>()

  constructor(private roleService: RoleService) {}

  editRole(roleName: string) {
    this.role.name = roleName
    this.roleService
      .editRole(this.role)
      .subscribe(() => this.close.emit());
    return false
  }
}
