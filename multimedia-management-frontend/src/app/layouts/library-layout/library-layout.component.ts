import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.router.navigate([this.router.url]);
      }
    });

  }
  ngOnDestroy() {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }
}
