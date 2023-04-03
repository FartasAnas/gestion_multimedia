import {Component, Input} from '@angular/core';
import HomeCardObject from "../../entities/HomeCardObject";

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent {
  @Input() homeCardObject?:HomeCardObject

}
