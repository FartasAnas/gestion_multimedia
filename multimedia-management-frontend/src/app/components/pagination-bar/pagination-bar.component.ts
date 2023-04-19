import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import PaginationInput from "../../entities/PaginationInput";

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.css']
})
export class PaginationBarComponent implements OnInit{

  @Input() currentPage: number=1;
  @Input() paginationInput:PaginationInput={
    listSize:20,
    sizeOptionIncrement:5
  }
  pageSize:number=10
  pages: number[] = [];
  pageSizeOptions: number[] = [];

  ngOnInit(): void {
    if (this.paginationInput.listSize > 5) {
      this.pageSize = 10;
    } else if (this.paginationInput.listSize > 0) {
      this.pageSize = 5;
    } else {
      this.pageSize = 0;
    }
    this.calculatePages();
    this.calculatePageSize();
  }

   calculatePages() {
    const totalPages = Math.ceil(this.paginationInput.listSize / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
   calculatePageSize() {
    const increment=this.paginationInput.sizeOptionIncrement
    let currentSize = increment;
    while (currentSize < this.paginationInput.listSize) {
      this.pageSizeOptions.push(currentSize);
      currentSize += this.paginationInput.sizeOptionIncrement;
    }
    this.pageSizeOptions.push(Math.ceil(this.paginationInput.listSize / increment) * increment);
  }


  handleChangePage(page: number) {
    this.currentPage=page
  }

  switchPage(action: 'next' | 'previous') {
    const totalPages = Math.ceil(this.paginationInput.listSize / this.pageSize);
    if (action === 'next' && this.currentPage < totalPages) {
      this.currentPage += 1;
    } else if (action === 'previous' && this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

}
