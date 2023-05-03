import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import SideBarContentObject from "../../entities/SideBarContentObject";
import {SharedService} from "../../services/shared-service/shared.service";

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.css']
})
export class SidebarButtonComponent implements OnInit{

  clicked:boolean=false;
  @Input() content:SideBarContentObject | undefined
  @Input() isChild:boolean=false;
  @Input() hasChildren:boolean=false;

  constructor(private router:Router, private sharedService: SharedService) {}

  handleClick(): void {
    if (this.hasChildren) {
      this.clicked = !this.clicked;
    } else {
      this.sharedService.setCategoryId(this.content?.id as number);
      this.router.navigate([this.content?.url ? this.content.url : 'home']);
    }
  }

  handleClass() {
    return {
      'selected': window.location.pathname.includes(this.content?.url as string),
      'child': this.isChild,
      'hasChildren': this.hasChildren
    }
  }
  ngOnInit(): void {
    if(window.location.pathname.includes(this.content?.url as string)){
      this.clicked=true
    }
  }
}
