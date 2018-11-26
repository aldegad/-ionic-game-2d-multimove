import { Injectable } from '@angular/core';
import { el } from '../../components/charactor/charactor';

/*
  Generated class for the MovingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovingProvider {

  moving_arr = [];

  constructor() {
    console.log('Hello MovingProvider Provider');
  }
  moveingArrAdd(el:el) {
    this.moving_arr.push(el);
  }
  moveingArrFix() {
    
    for(let i = 0; i < this.moving_arr.length; i++) {
      const i_obj = {
        left: this.moving_arr[i].destinationX - (this.moving_arr[i].width/2),
        right: this.moving_arr[i].destinationX + (this.moving_arr[i].width/2),
        top: this.moving_arr[i].destinationY - (this.moving_arr[i].height/2),
        bottom: this.moving_arr[i].destinationY + (this.moving_arr[i].height/2)
      }
      for(let j = 0; j < this.moving_arr.length; j++) {
        let fold = 0;
        const j_obj = {
          left: this.moving_arr[j].destinationX - (this.moving_arr[j].width/2),
          right: this.moving_arr[j].destinationX + (this.moving_arr[j].width/2),
          top: this.moving_arr[j].destinationY - (this.moving_arr[j].height/2),
          bottom: this.moving_arr[j].destinationY + (this.moving_arr[j].height/2)
        }
        console.log(this.moving_arr);
        console.log(i_obj);
        console.log(j_obj);
        if(
          (
            (j_obj.left <= i_obj.left && i_obj.left <= j_obj.right)
            || (j_obj.left <= i_obj.right && i_obj.right <= j_obj.right)
          ) && (
            (j_obj.top <= i_obj.top && i_obj.top <= j_obj.bottom)
            || (j_obj.top <= i_obj.bottom && i_obj.bottom <= j_obj.bottom)
          ) && (i != j)
        ) {
          switch(fold%4) {
            case 0:
            this.moving_arr[i].destinationY = this.moving_arr[j].destinationY - this.moving_arr[j].height;
            break;
            case 1:
            this.moving_arr[i].destinationX = this.moving_arr[j].destinationX + this.moving_arr[j].width;
            break;
            case 2:
            this.moving_arr[i].destinationY = this.moving_arr[j].destinationY + this.moving_arr[j].height;
            break;
            case 3:
            this.moving_arr[i].destinationX = this.moving_arr[j].destinationX - this.moving_arr[j].width;
            break;
          }
          fold++;
        }
      }
    }
  }
  moveingArrRemove(el:el) {
    this.moving_arr.splice(this.moving_arr.indexOf(el), 1);
    return new Promise(resolve => setTimeout(resolve, 0));
  }
  moveingWait() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }
}