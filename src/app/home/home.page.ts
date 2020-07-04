import { Component, OnInit } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private tokenCat: string = '';
  private catViewed: any = {};
  private catList: any[] = [];
  private indexCat: number = -1;

  constructor(
      private gestureCtrl: GestureController,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private apiService: ApiService
    ) { }

  ngOnInit() {
    this.initGesture();
    this.getParams();
  }

  private getParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params)
      this.tokenCat = params.token;
      this.getAllCats();
    })
  }

  private loadCatView(index: number) {
    this.indexCat = index;
    this.catViewed = this.catList[this.indexCat];
  }

  private moveToRight() { // ->
    if (this.indexCat === this.catList.length - 1) {
      this.indexCat = 0;
    } else {
      this.indexCat += 1;
    }
    this.loadCatView(this.indexCat);
  }

  private moveToLeft() { // <-
    if (this.indexCat === 0) {
      this.indexCat = this.catList.length - 1
    } else {
      this.indexCat -= 1;
    }
    this.loadCatView(this.indexCat);
  }

  private getAllCats () {
    this.apiService.getCats(this.tokenCat).subscribe(response => {
      console.log('response', response);
      this.catList = response.catsAvailable;
      this.loadCatView(0);
    })
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
      this.moveToLeft();
    } else {
      console.log('mover a la derecha')
      this.moveToRight();
    }
  }

}
