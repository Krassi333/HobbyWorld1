import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/types/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('loginForm') loginForm!: NgForm;

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  constructor(private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private cookie:CookieService) { }

  onSubmit(loginForm: NgForm) {
    if (this.loginForm.invalid) {
      return;
    }


    //console.log(this.loginForm.value);
    const data = this.loginForm.value;
    this.authService.login(data).subscribe(
      (response: any) => {
        this.cookie.set('token',response.idToken);
        this.loginForm.reset();
        this.router.navigate(['/']);
      },
      (err: any) => {
    console.log(err);
    
        const errorMessage = "Login failed - " + err.message;

        this.matSnackBar.open(errorMessage, "OK", {
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: "'bg-danger'"
        });

      }
    )

  }

}
