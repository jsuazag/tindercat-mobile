import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string = 'emma@gmail.com';
  private password: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    console.log('Login start');
  }

  public loginSubmit() {
    const formData = {
      email: this.email,
      password: this.password
    };
    console.log('el formulario se envío');
    console.log('Form received', formData);
    this.requestLogin(formData)
  }

  private requestLogin(params) {
    this.apiService.login(params).subscribe(response => {
      console.log('response', response)
    })
  }

}
