import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  loginMessage: string | undefined = '';
  registerMessage: string | undefined = '';
  role: string | undefined = '';

  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {
    this.role = localStorage.getItem('role') || 'user';
  }
  // Sign-up
  signUp(user: any): Observable<any> {
    let api = `${this.endpoint}/register`;
    if (user.password != user.confirmPassword) {
      this.registerMessage = 'Password and Confirm Password do not match';
      return throwError('Something went wrong!');
    }
    return this.http
      .post(api, {
        email: user.email,
        password: user.password,
        role: user.role,
      })
      .pipe(
        map((res: any) => {
          this.registerMessage = '';
          return res;
        }),
        catchError((error) => {
          this.registerMessage = error.error.error;
          return throwError('Something went wrong!');
        })
      );
  }
  // Sign-in
  signIn(user: any) {
    return this.http.post<any>(`${this.endpoint}/login`, user).pipe(
      map((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('role', res.role);
        this.loginMessage = '';
        return res;
      }),
      catchError((error) => {
        this.loginMessage = error.error.error || error.error.message;
        return throwError('Something went wrong!');
      })
    );
  }
  signUpCoach(user: any): Observable<any> {
    let api = `${this.endpoint}/register`;
    if (user.password != user.confirmPassword) {
      this.registerMessage = 'Password and Confirm Password do not match';
      return throwError('Something went wrong!');
    }
    return this.http.post(api, user).pipe(
      map((res: any) => {
        this.registerMessage = '';
        return res;
      }),
      catchError((error) => {
        this.registerMessage = error.error.error;
        return throwError('Something went wrong!');
      })
    );
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getIsLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeRole = localStorage.removeItem('role');
    if (removeToken == null && removeRole == null) {
      this.router.navigate(['/']);
    }
  }
  getLoginMessage() {
    return this.loginMessage;
  }
  getRegisterMessage() {
    return this.registerMessage;
  }
  getRole() {
    return this.role;
  }
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
