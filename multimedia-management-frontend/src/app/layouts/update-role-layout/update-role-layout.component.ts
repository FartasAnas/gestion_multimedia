import {Component, OnInit} from '@angular/core';
import Role from "../../entities/Role";
import {RoleService} from "../../services/role/role.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-role-layout',
  templateUrl: './update-role-layout.component.html',
  styleUrls: ['./update-role-layout.component.css']
})
export class UpdateRoleLayoutComponent implements OnInit{
  isUpdating=false;
  roleObject?:Role;
  roleObjectInitialValue?:Role;
  showConfirmation = false;
  updateSideBar=false;
  constructor(private roleService:RoleService,private activatedRoute: ActivatedRoute,private router:Router) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getRole(+params['id']);
    });
  }
  private getRole(id: number) {
    this.roleService.getRoleById(id).subscribe(data => {
      this.roleObject = data;
      this.roleObjectInitialValue= {...this.roleObject};
    });
  }
  handleCancelBtn() {
    this.isUpdating=false
    this.getRole((this.roleObject as Role).id as number)
  }

  handleUpdateBtn() {

    if(this.isUpdating){
        this.roleService.updateRole(this.roleObject as Role).subscribe(data=>{
            this.isUpdating=false
            this.updateSideBar=true;
            this.roleObjectInitialValue= {...this.roleObject} as Role;

        })
    }
    this.updateSideBar=false;
    this.isUpdating=true
  }

  handleDeleteRole() {
    this.roleService.deleteRole((this.roleObject as Role).id as number).subscribe(data=>{
      this.router.navigate(['/roles'])
    })
  }
  handleConfirmation(confirmed: boolean) {
    if(confirmed){
      this.roleService.deleteRole((this.roleObject as Role).id as number).subscribe(data=>{
        this.router.navigate(['/roles'])
      })
    }
    this.showConfirmation = false;
  }
}
