import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router, Routes} from "@angular/router";
import {ImagesLayoutComponent} from "../images-layout/images-layout.component";
import {VideosLayoutComponent} from "../videos-layout/videos-layout.component";
import {DocumentsLayoutComponent} from "../documents-layout/documents-layout.component";
import {PictosLayoutComponent} from "../pictos-layout/pictos-layout.component";
import {FileDetailsLayoutComponent} from "../file-details-layout/file-details-layout.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-library-layout',
  templateUrl: './library-layout.component.html',
  styleUrls: ['./library-layout.component.css']
})
export class LibraryLayoutComponent implements OnInit{
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  private routeParamSubscription?: Subscription;

  ngOnInit() {
    this.routeParamSubscription = this.activatedRoute.params.subscribe(params => {
      const categoryPath = params['categoryPath'];
      if(categoryPath) {
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate([this.router.url]);
      }
    });

  }
  ngOnDestroy() {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }
}
