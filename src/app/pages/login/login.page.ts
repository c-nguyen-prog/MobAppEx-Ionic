import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public toastController: ToastController, private http : HttpClient,
              private router : Router, private storage: Storage ) {

  }

  ngOnInit() { }

  headers = new HttpHeaders();

  // @ts-ignore
  server: string = this.storage.get('server').then((serverIP) => {
    this.server = serverIP + "/SnoozeUsers/login";
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json' );
  });

  form = {
    username: "",
    password: ""
  };

  session = {
    id: "",
    userId: ""
  };

  loginPressed = false;

  async submit() {
    let status = "Empty field";
    if (this.form.username && this.form.password) {
       //TODO encrypt password
        status = "OK";
        console.log(this.form);
    }

    if (status === "OK") {
      this.loginPressed = !this.loginPressed;
      setTimeout(() => { this.loginPressed = false }, 1500);
      await this.requestAuthToken();
    } else {
      this.toast(status);
    }
  }

  async requestAuthToken() {
    // @ts-ignore
    this.http.post(this.server, this.form, this.headers).subscribe((res : any) => {
      console.log(res);
      if (res.id) {
        this.session = {
          id: res.id,
          userId: res.userId
        };
        this.saveToStorage('session', this.session)
        this.toast("Authenticated, loading user " + this.session.userId)
        this.router.navigateByUrl('/tabs/tab1')
      }
    }, error => {
      console.log(error);
      if (error.error.error.message) {
        this.toast(error.error.error.message)
      }
    });
    return this.session
  }

  async saveToStorage(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
