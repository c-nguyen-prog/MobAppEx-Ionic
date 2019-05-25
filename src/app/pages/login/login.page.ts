import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginPressed = false;

  constructor(public toastController: ToastController, private http : HttpClient,
              private router : Router, private storage: Storage,
              private authenticationService : AuthService, private formBuilder: FormBuilder ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginPressed = !this.loginPressed;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
        .pipe(first())
        .subscribe(
            data => {
              this.storage.get('session').then((session) => this.toast('Authenticated, loading user ' + session.userId));
              this.router.navigateByUrl('/tabs/tab1');
              this.loginPressed = !this.loginPressed;
            },
            error => {
              console.log(error);
              if (error.error.error.message) {
                this.toast(error.error.error.message)
              }
              this.loginPressed = !this.loginPressed;
            });
  }

  /*
  OLD CODE: Manually log in
  submit() {
    let status = "Empty field";
    if (this.form.username && this.form.password) {
       //TODO encrypt password
        status = "OK";
        console.log(this.form);
    }

    if (status === "OK") {
      this.loginPressed = !this.loginPressed;
      setTimeout(() => { this.loginPressed = false }, 2000);
      this.requestAuthToken();
    } else {
      this.toast(status);
    }
  }

  async requestAuthToken() {
    // @ts-ignore
    this.http.post(this.server, this.form).subscribe((res : any) => {
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
 */

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