import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared-service/shared.service";

@Component({
  selector: 'app-pictos-layout',
  templateUrl: './pictos-layout.component.html',
  styleUrls: ['./pictos-layout.component.css']
})
export class PictosLayoutComponent implements OnInit {
  categoryId?:number;
  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.sharedService.categoryId$.subscribe(categoryId => {
      this.categoryId = categoryId;
    });
  }

}
