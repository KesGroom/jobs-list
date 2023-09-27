import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Colors = 'white' | 'gray' | 'dark-gray' | 'blue' | 'black' | 'red';

export interface Toast {
  text: string,
  state: 'show' | 'hide' | 'shake',
  color?: Colors,
  background?: Colors
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  //Stores the current toast message with its state, text, background color, and text color.
  public toast!: Toast;
  //Subject that emits a boolean value to show or hide a pop-up.
  public $popUpState = new Subject<boolean>();
  //Boolean variable that keeps track of the pop-up state.
  public showPopUp: boolean = false;


  constructor() { }
  /**
   *
   * @param text: string
   * @param background: Colors
   * @param color: Colors
   *
   * description: Sets the toast message with the given text, background color,
   * and text color. It also calls the programmingStates() method to set the
   * toast state to 'shake' and then 'hide' after a certain amount of time.
   */
  setToast(text: string, background: Colors = 'dark-gray', color: Colors = 'white') {
    this.toast = { state: 'show', text, background, color };
    this.programmingStates();
  }

  private programmingStates() {
    setTimeout(() => {
      this.toast.state = 'shake';
      setTimeout(() => {
        this.toast.state = 'hide'
      }, 3500);
    }, 1500);
  }
}
