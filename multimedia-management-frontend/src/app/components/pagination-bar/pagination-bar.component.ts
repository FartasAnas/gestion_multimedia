import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import PaginationInput from "../../entities/PaginationInput";

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.css']
})
export class PaginationBarComponent implements OnInit,OnChanges{
    ngOnChanges(changes: SimpleChanges): void {
        if('paginationInput' in changes){
          this.calculatePageSize()
          this.calculatePages()
          this.calculatePageSizeOption()
        }
    }

  @Input() currentPage: number=1;
  @Input() paginationInput:PaginationInput={
    listSize:20,
    sizeOptionIncrement:5
  }
  pageSize:number=10
  pages: number[] = [];
  pageSizeOptions: number[] = [];
  @Output() pageChanged = new EventEmitter<{ currentPage: number; pageSize: number }>();

  ngOnInit(): void {
    this.calculatePageSize()
    this.calculatePages();
    this.calculatePageSizeOption();
  }
  calculatePageSize(){
    const increment=this.paginationInput.sizeOptionIncrement
    if (this.paginationInput.listSize > increment) {
      this.pageSize = increment*2;
    } else if (this.paginationInput.listSize > 0 && this.paginationInput.listSize <= increment) {
      this.pageSize = increment;
    } else {
      this.pageSize = 0;
    }
  }
  calculatePages() {
    const totalPages = Math.ceil(this.paginationInput.listSize / this.pageSize);
    if (!isFinite(totalPages) || totalPages <= 0) {
      return;
    }
    this.pages = Array(totalPages).fill(0).map((_, i) => i + 1);
    this.currentPage = 1;
    this.pageChanged.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
  }

  calculatePageSizeOption() {
    this.pageSizeOptions=[]
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
    this.pageChanged.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
  }

  switchPage(action: 'next' | 'previous') {
    const totalPages = Math.ceil(this.paginationInput.listSize / this.pageSize);
    if (action === 'next' && this.currentPage < totalPages) {
      this.currentPage += 1;
      this.pageChanged.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
    } else if (action === 'previous' && this.currentPage > 1) {
      this.currentPage -= 1;
      this.pageChanged.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
    }
  }

}
