import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-switch-input',
  templateUrl: './switch-input.component.html',
  styleUrls: ['./switch-input.component.css']
})
export class SwitchInputComponent {
  @Input() isChecked?: boolean
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  onToggle() {
    this.isChecked = !this.isChecked;
    this.toggle.emit(this.isChecked);
  }
}
