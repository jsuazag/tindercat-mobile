import { Component, OnInit } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private gestureCtrl: GestureController) { }

  ngOnInit() {
    this.initGesture();
  }

  private initGesture() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: document.querySelector('#view-cat'),
      threshold: 15,
      gestureName: 'my-gesture',
      onEnd: ev => this.onEndHandler(ev)
    }, true);
    gesture.enable();
  }

  private onEndHandler(detail) {
    const type = detail.type;
    const currentX = detail.currentX;
    const deltaX = detail.deltaX;
    const velocityX = detail.velocityX;

    console.log(`deltaX ${deltaX} type ${type} currentx ${currentX} velocityX ${velocityX}`);
    if (deltaX < 0) {
      console.log('mover a la izquierda')
    } else {
      console.log('mover a la derecha')
    }
  }

}
