import {  Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!: NgForm;

  ngOnInit(): void { }

  constructor(private authService: AuthService) { }

  onSubmit(loginForm: NgForm) {
    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;
     this.authService.login(data)
  }

}
