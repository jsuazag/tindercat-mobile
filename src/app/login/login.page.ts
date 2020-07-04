import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string = 'emma@gmail.com';
  private password: string = '4321';

  constructor(
      private apiService: ApiService,
      private router: Router,
      private toastCtrl: ToastController) { }

  ngOnInit() {
    console.log('Login start');
  }

  public loginSubmit() {
    const formData = {
      email: this.email,
      password: this.password
    };
    this.requestLogin(formData)
  }

  private requestLogin(params) {
    this.apiService.login(params).subscribe(response => {
      console.log('response', response);
      this.validateResponseLogin(response);
    })
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  private validateResponseLogin(response) {
    const { status, token } = response
    if (status === 1) {
      console.log('vaya al home :D')
      const navigationExtras: NavigationExtras = {
        queryParams: {
          token: token
        }
      };
      this.router.navigate(['/home'], navigationExtras);
    } else {
      console.log('Usuario no valido :(')
      this.showToast('Email or Password not valid')
    }
  }

}
