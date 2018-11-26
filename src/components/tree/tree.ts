import { Component } from '@angular/core';

/**
 * Generated class for the TreeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tree',
  templateUrl: 'tree.html',
  host: {
    '[style.top]' : 'this.el_move.pageY + "px"',
    '[style.left]' : 'this.el_move.pageX + "px"',
    '(document:mouseup)' : 'mouseDown($event)'
  }
})
export class TreeComponent {

  constructor() {
    console.log('Hello TreeComponent Component');
  }
  mouseDown(ev) {

  }
}
