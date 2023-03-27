import {Component, Input} from '@angular/core';
import SidebarBtnInput from "../../entities/SidebarBtnInput";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.css']
})
export class SidebarButtonComponent {

  clicked:boolean=false;
  @Input() content:SidebarBtnInput | undefined
  @Input() isChild:boolean=false;
  @Input() hasChildren:boolean=false;

  constructor(private route:Router) {}

  handleClick():void{
    this.clicked = !this.clicked;
    this.route.navigate([this.clicked && this.content?.url ?  this.content.url : "home"]);
  }

  handleClass() {
    return {
      'selected': this.clicked || (this.content?.url?.toLowerCase()==window.location.pathname),
      'child': this.isChild,
      'hasChildren': this.hasChildren
    }
  }
}
