import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-state-tag',
  templateUrl: './state-tag.component.html',
  styleUrls: ['./state-tag.component.css']
})
export class StateTagComponent {
  @Input() state?:String

  fileStateTranslate() {
    switch (this.state) {
      case "PUBLISHED":
        return "Publié";
      case "PLANNED":
        return "Planifié";
      case "PENDING":
        return "En attente";
      case "UNPUBLISHED":
        return "Non publié";
      default:
        return "";
    }
  }
}
