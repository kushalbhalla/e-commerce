import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Subject } from 'rxjs';

const Url = 'http://127.0.0.1:8000/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(username: string, password: string, email: string) {
    
    return this.http
      .post(
        Url+'users/',
        {
          username:username,
          password:password,
          email:email
        }
      )
      .pipe(
        catchError(this.handleError),
        tap( resData => {
          this.login(username, password)
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post(
        Url+"token/login/", 
        {
          username: username,
          password: password
        }
      )
    .pipe(
      catchError(this.handleError),
      tap(resData => {                            
        this.handleAuthentication(
          username,
          Object.values(resData)[0]
        )
      })
    );
  }

  autoLogin() {
    const userData: {
      username: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData') || '');
    if(!userData) {
      return;
    }

    const loaderUser = new User(userData.username, userData._token);
    if (loaderUser) {
      this.user.next(loaderUser)
      
    }
  }

  private handleAuthentication(
    username: string,
    token: string
  ) {
    const user = new User(username, token);    
    this.user.next(user);   
      
    
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {    
    let errorMessage = 'Unknown error!';
    if (errorRes.error['non_field_errors'][0]) {
      errorMessage = "Unable to log in with provided credentials"
      return throwError(errorMessage);
    }

    if(errorRes.error['username'][0]) {      
      errorMessage = 'A user with that username already exists.';
      return throwError(errorMessage);
    }

    if(errorRes.error['password'][0]) {
      errorMessage = 'The password is too similar to the username';
      return throwError(errorMessage);
    }
    
    return throwError(errorMessage);
  }
}
