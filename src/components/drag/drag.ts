import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'drag',
  templateUrl: 'drag.html',
  host: {
    '[style.display]' : 'is_dragging ? "block" : "none"',
    '[style.left]' : 'drag_obj.left + "px"',
    '[style.top]' : 'drag_obj.top + "px"',
    '[style.width]' : 'drag_obj.width + "px"',
    '[style.height]' : 'drag_obj.height + "px"',
    '(document:mousedown)' : 'dragStart($event)',
    '(document:mousemove)' : 'dragMove($event)',
    '(document:mouseup)' : 'dragEnd()',
    '(document:mouseleave)' : 'dragEnd()'
  }
})
export class DragComponent {

  drag_obj = {
    startX: 0,
    startY: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0
  }

  is_dragStart:boolean = false;
  is_dragging:boolean = false;

  constructor(
    private events: Events
  ) {

  }

  dragStart(ev) {
    if(ev.button == 0) {
      this.is_dragStart = true;
      this.drag_obj.startX = ev.pageX;
      this.drag_obj.startY = ev.pageY;
      this.drag_obj.left = ev.pageX;
      this.drag_obj.top = ev.pageY;
      this.drag_obj.width = 0;
      this.drag_obj.height = 0;
    }
  }
  dragMove(ev) {
    if(this.is_dragStart) {
      const moveX = ev.pageX - this.drag_obj.startX;
      const moveY = ev.pageY - this.drag_obj.startY;
      if(moveX > 5 || moveY > 5) {
        this.is_dragging = true;
        this.events.publish('dragSelect', this.drag_obj);
        this.drag_obj.left = moveX >= 0 ? this.drag_obj.startX : ev.pageX;
        this.drag_obj.top = moveY >= 0 ? this.drag_obj.startY : ev.pageY;
        this.drag_obj.width = Math.abs(moveX);
        this.drag_obj.height = Math.abs(moveY);
      }
    }
  }
  dragEnd() {
    if(this.is_dragStart) {
      this.is_dragStart = false;
      if(this.is_dragging) {
        this.is_dragging = false;
      } else {
        this.events.publish('clickSelect', this.drag_obj);
      }
      
      this.drag_obj.left = 0;
      this.drag_obj.top = 0;
      this.drag_obj.width = 0;
      this.drag_obj.height = 0;
    }
  }
}

export interface dragObj {
  startX: number,
  startY: number,
  left: number,
  top: number,
  width: number,
  height: number
}