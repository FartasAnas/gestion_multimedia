import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit{
  months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  weekDays = ['lun','mar','mer','jeu','ven','sam','dim']
  currentMonth = new Date().getMonth();
  currentYear= new Date().getFullYear();
  startDate?: Date;
  endDate?: Date;
  hoveredDate?: Date;
  days=[]
  displayCalendar=false


  ngOnInit(): void {
  }
  formatDate(date: Date | undefined): string {
    if (!date) {
      return '00/00/0000';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getDaysInMonth(month: number, year: number): number[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  getEmptyDaysBeforeFirstDayOfMonth(month: number, year: number): number[] {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const emptyDays = (firstDayOfMonth + 6) % 7; // Adjust for Monday as the first day of the week
    return Array.from({ length: emptyDays }, (_, i) => i + 1);
  }

  previousMonth() {
    this.currentMonth=(this.currentMonth === 0) ?this.currentMonth = this.months.length - 2:this.currentMonth-1;
    this.currentYear = (this.currentMonth === 10) ? (this.currentYear as number) - 1 : this.currentYear;
  }

  nextMonth() {
    this.currentMonth=(this.currentMonth === 10) ?  this.currentMonth = 0 : this.currentMonth+1
    this.currentYear = (this.currentMonth === 0) ? (this.currentYear as number) + 1 : this.currentYear;
  }

  selectDate(day: number, month: number, year: number): void {
    const selectedDate = new Date(year, month, day);
    if (!this.startDate || (this.endDate && this.startDate && this.endDate)) {
      this.startDate = selectedDate;
      this.endDate = undefined;
    } else if (selectedDate > this.startDate) {
      this.endDate = selectedDate;
    } else {
      this.startDate = selectedDate;
    }
    console.log("startDate:"+this.startDate)
    console.log("endDate:"+this.endDate)
  }
  isStartDate(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day);
    return (this.startDate && this.startDate.getTime() === date.getTime()) ?? false;
  }

  isEndDate(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day);
    return (this.endDate && this.endDate.getTime() === date.getTime()) ?? false;
  }

  updateHoveredDate(day: number, month: number, year: number): void {
    this.hoveredDate = new Date(year, month, day);
  }

  isHovered(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day);
    if (this.startDate && this.endDate) {
      return date > this.startDate && date < this.endDate;
    }
    return (this.startDate && !this.endDate && this.hoveredDate && date > this.startDate && date <= this.hoveredDate) ?? false;
  }

}
