import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared-service/shared.service";

@Component({
  selector: 'app-videos-layout',
  templateUrl: './videos-layout.component.html',
  styleUrls: ['./videos-layout.component.css']
})
export class VideosLayoutComponent implements OnInit {
  categoryId?:number;
  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.sharedService.categoryId$.subscribe(categoryId => {
      this.categoryId = categoryId;
    });
  }

}
