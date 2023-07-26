import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('',
      [Validators.required,
      Validators.minLength(5)]),
    email: new FormControl('',
      [Validators.required,
      Validators.email]),
    password: new FormControl('',
      [Validators.required,
      Validators.minLength(6)]),
    rePass: new FormControl('', [Validators.required])

  })

  ngOnInit(): void { }

  constructor(private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar) { }

  onSubmit() {
    console.log(this.registerForm.value);

    this.authService.register(this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.username)
  }
}


