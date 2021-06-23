import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../shared/auth.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  error!: string;
  constructor(private _snackBar:MatSnackBar, private commonService: CommonService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.commonService.setTitle('Sign up')
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
      

    let signupObs = new Observable();

    this.isLoading = true;
    
    signupObs = this.authService.signup(username, password, email);

    signupObs.subscribe(resData => {
      
      this.isLoading = false;
      this.router.navigate(['/']);
    }, 
      errorMessage => {
        this.error = errorMessage;        
        this.isLoading = false;
        this.error = errorMessage;
        this.isLoading = false;
        this._snackBar.open(this.error, 'X', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 5*1000,
      });  
        
    });
  }

}
