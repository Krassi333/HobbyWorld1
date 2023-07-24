import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  isPasswordResetCodeSent: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  onSendPasswordResetCode(resetForm: NgForm) {
    this.authService.sendResetEmail(resetForm.value).subscribe(
      () => {
        this.snackBar.open('Email Sent.', 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'bg-success',
        });
        this.isPasswordResetCodeSent = true;
        this.router.navigate(['auth/login']);
      },
      (error) => {
        let errorMessage = 'Operation Failed - ' + error.error.error.message;

        this.snackBar.open(errorMessage, 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'bg-danger',
        });
      }
    );
  }
}