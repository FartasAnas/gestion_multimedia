import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared-service/shared.service";

@Component({
  selector: 'app-documents-layout',
  templateUrl: './documents-layout.component.html',
  styleUrls: ['./documents-layout.component.css']
})
export class DocumentsLayoutComponent implements OnInit {
  categoryId?:number;
  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.sharedService.categoryId$.subscribe(categoryId => {
      this.categoryId = categoryId;
    });
  }

}
