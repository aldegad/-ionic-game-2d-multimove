import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { dragObj } from '../drag/drag';
import { MovingProvider } from '../../providers/moving/moving';

@Component({
  selector: 'charactor',
  templateUrl: 'charactor.html',
  host: {
    '(document:contextmenu)' : 'charactorMove($event)'
  }
})
export class CharactorComponent {

  el = {
    speed: 5,
    pageX: 300,
    pageY: 300,
    destinationX: 300,
    destinationY: 300,
    width: 80,
    height: 80
  }
  moveAnimation = null;

  is_movePoint:boolean = false;
  is_selected:boolean = false;

  constructor(
    private events: Events,
    private moveingProv: MovingProvider
  ) {

  }

  ngOnInit() {
    this.events.subscribe('dragSelect', (drag_obj:dragObj) => {
      this.dragSelect(drag_obj);
    });
    this.events.subscribe('clickSelect', (drag_obj:dragObj) => {
      this.clickSelect(drag_obj);
    });
    this.moveingProv.moveingArrAdd(this.el);
    this.moveingProv.moveingArrFix();
  }

  async charactorMove(ev) {
    ev.preventDefault();
    this.is_movePoint = false;
    await this.moveingProv.moveingWait();
    clearInterval(this.moveAnimation);
    
    if(this.is_selected) {
      this.el.destinationX = ev.pageX;
      this.el.destinationY = ev.pageY;

      
      this.is_movePoint = true;
      this.moveingProv.moveingArrFix();
      await this.moveingProv.moveingWait();
      console.log(this.el);
      const dis = Math.sqrt(Math.pow(this.el.pageX - this.el.destinationX, 2) + Math.pow(this.el.pageY - this.el.destinationY, 2));
      const steps = dis*(1/this.el.speed);
      const dot = {
        moveX: (this.el.destinationX - this.el.pageX)/steps,
        moveY: (this.el.destinationY - this.el.pageY)/steps,
      }

      this.moveAnimation = setInterval(() => {
        if(Math.abs(this.el.destinationX - this.el.pageX) <= Math.abs(dot.moveX)
        || !(this.el.destinationX - this.el.pageX)) {
          this.el.pageX = this.el.destinationX;
          this.el.pageY = this.el.destinationY;

          this.is_movePoint = false;
          clearInterval(this.moveAnimation);
        } else {
          this.el.pageX += dot.moveX;
          this.el.pageY += dot.moveY;
        }
      }, 5);
    }
  }
  dragSelect(drag_obj:dragObj) {
    if(drag_obj.left < this.el.pageX && this.el.pageX < (drag_obj.left + drag_obj.width)
    && drag_obj.top < this.el.pageY && this.el.pageY < (drag_obj.top + drag_obj.height)) {
      this.is_selected = true;
    } else {
      this.is_selected = false;
    }
  }
  clickSelect(drag_obj:dragObj) {
    if((this.el.pageX - (this.el.width/2)) < drag_obj.left && drag_obj.left < (this.el.pageX + (this.el.width/2))
    && (this.el.pageY - (this.el.height/2)) < drag_obj.top && drag_obj.top < (this.el.pageY + (this.el.height/2))) {
      this.is_selected = true;
    } else {
      this.is_selected = false;
    }
  }
}
export interface el {
  speed: number,
  pageX: number,
  pageY: number,
  destinationX: number,
  destinationY: number,
  width: number,
  height: number
}