import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared-service/shared.service";

@Component({
  selector: 'app-images-layout',
  templateUrl: './images-layout.component.html',
  styleUrls: ['./images-layout.component.css']
})
export class ImagesLayoutComponent implements OnInit {
  categoryId?:number;
  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.sharedService.categoryId$.subscribe(categoryId => {
      this.categoryId = categoryId;
    });
  }

}
