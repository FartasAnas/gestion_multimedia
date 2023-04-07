import {Component, Input, OnInit} from '@angular/core';
import FileObject from "../../entities/FileObject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent implements OnInit{
  hostname=window.location.hostname
  @Input() fileObject?:FileObject
  fileType?:String
  constructor(private router: Router) {
  }
  handleDisplayFile() {
    this.router.navigate(['web/file/',this.fileObject?.id]);
  }

  ngOnInit(): void {
    this.fileType=this.fileObject?.type
  }
}
