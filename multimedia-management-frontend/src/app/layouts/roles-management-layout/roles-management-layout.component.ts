import {Component, OnInit} from '@angular/core';
import Role from "../../entities/Role";
import {RoleService} from "../../services/role/role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-roles-management-layout',
  templateUrl: './roles-management-layout.component.html',
  styleUrls: ['./roles-management-layout.component.css']
})
export class RolesManagementLayoutComponent implements OnInit{
  showAddRoleInterface=false;
  roles: Role[] = [];
  constructor(private roleService:RoleService,private router:Router) {
  }
  ngOnInit(): void {
    this.loadRoles();
  }
  private loadRoles(){
    this.roleService.getRoles().subscribe(
      (roles:Role[])=>{
        this.roles=roles;
      }
    )
  }
  handleCloseAddInterfaceEvent(showInterface: boolean) {
    this.showAddRoleInterface = showInterface;
    this.loadRoles()
  }

  onRoleAdded(){
    this.loadRoles()
  }

  handleCreateRole() {
    this.router.navigate(['/roles/create'])
  }
}
