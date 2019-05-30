import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../auth/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string;
  server: string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient, private storage: Storage, private authService: AuthService) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();

    this.storage.get('server').then((serverIP) => {
      this.server = serverIP;
    });

    this.storage.get('access_token').then(token => {
      if (typeof token == 'string') {
        this.token = token;
      }
    });
  }

  //API METHODS
  changePassword(oldPassword: string, newPassword: string) {
    let params = this.setParamToken(this.token);
    return this.httpClient.post(`${this.server}/SnoozeUsers/change-password`,  {oldPassword, newPassword},{params: params}).pipe(
        map( (res) => {
          return res;
        })
    );
  }

  getUser(token) {
    this.token = token;
    let params = this.setParamToken(token);
    return this.httpClient.get(`${this.server}/SnoozeUsers/GetUserData`, {params: params}).pipe(
        map((res) => {
          this.saveToStorage('user', res);
          // @ts-ignore
          this.currentUserSubject.next(res);
          return res;
        })
    )
  }

  logOut() {
    this.getToken();
    let params = this.setParamToken(this.token);
    return this.httpClient.post(`${this.server}/SnoozeUsers/logout`, {}, {params: params}).pipe(
        map((res) => {
          return res;
        })
    )
  }

  logOutLocally() {
    this.storage.remove('user');
    this.storage.remove('access_token');
    return true
  }
  getCapsules() {
    this.getToken();
    let params = this.setParamToken(this.token);
    return this.httpClient.post(`${this.server}/Capsules`, {}, {params: params}).pipe(
        map((res) => {
          return res;
        })
    )
  }

  getCapsuleById(id) {
    this.getToken();
    let params = this.setParamToken(this.token);
    return this.httpClient.post(`${this.server}/Capsules/${id}`, {}, {params: params}).pipe(
        map((res) => {
          return res;
        })
    )
  }

  //HELPER METHODS
  setParamToken(token) {
    let params = new HttpParams();
    params = params.append('access_token', token);
    return params
  }

  getCurrentUser() {
    return this.storage.get('user').then(user => {
      return user;
    })
  }

  public get currentUserValue() : User {
    return this.currentUserSubject.value;
  }

  getToken() {
    return this.storage.get('access_token').then(token => {
      this.token = token;
      return token;
    })
  }

  async saveToStorage(key: string, value: any) {
    await this.storage.set(key, value);
  }
}