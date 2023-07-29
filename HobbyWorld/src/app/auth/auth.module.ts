import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './profile/profile.component';
import { MyPostsComponent } from './profile/my-posts/my-posts.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ResetComponent } from './reset/reset.component';
import { AuthService } from './auth-service.service';
import { AppCheckModule } from '@angular/fire/app-check';
import { AppModule } from '../app.module';
import { LoadingComponent } from '../shared/loading/loading.component';
import { SharedModule } from '../shared/shared.module';






@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MyPostsComponent,
    ResetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ResetComponent
  ],
  providers:[AuthService]
})
export class AuthModule { }
