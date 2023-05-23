import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-user-interface',
  templateUrl: './add-user-interface.component.html',
  styleUrls: ['./add-user-interface.component.css']
})
export class AddUserInterfaceComponent {
  @Output() closeInterface = new EventEmitter<boolean>();

  handelCloseInterfaceClick() {
    this.closeInterface.emit(false);
  }
}
