import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthActivate } from './guards/auth.activate';
import { ProfileComponent } from './profile/profile.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
    {
        path: 'login',
        title:'HobbyWorld-Login Page',
        component: LoginComponent,
        //canActivate: [AuthActivate]
    },
    {
        path: 'register',
        title:'HobbyWorld-Register Page',

        component: RegisterComponent,
        //canActivate: [AuthActivate]
    },
    {
        path: 'myProfile',
        title:'HobbyWorld-My profile',

        component: ProfileComponent,
        //canActivate: [AuthActivate]
    },
    {
        path: 'reset',
        title:'HobbyWorld-Reset Password',

        component: ResetComponent,
        //canActivate: [AuthActivate]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
