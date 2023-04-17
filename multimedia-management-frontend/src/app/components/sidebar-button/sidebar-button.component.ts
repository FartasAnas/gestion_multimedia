import {Component, Input, OnInit} from '@angular/core';
import SidebarBtnInput from "../../entities/SidebarBtnInput";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.css']
})
export class SidebarButtonComponent implements OnInit{

  clicked:boolean=false;
  @Input() content:SidebarBtnInput | undefined
  @Input() isChild:boolean=false;
  @Input() hasChildren:boolean=false;

  constructor(private route:Router) {}

  handleClick():void{
    if(this.hasChildren) {
      this.clicked = !this.clicked;
    }
    else {
      this.route.navigate([ this.content?.url ?  this.content.url : "home"]);
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
