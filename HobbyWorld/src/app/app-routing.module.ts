import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { DetailsComponent } from './features/details/details.component';
import { CreatePostComponent } from './features/create-post/create-post.component';
import { ProfileComponent } from './auth/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    title:"HobbyWorld",
    component: HomeComponent
  },
  {
    path: 'auth',
 
    loadChildren: () => import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: 'features',
    loadChildren: () => import('./features/featutes-routing.module').then((m) => m.FeaturesRoutingModule),

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
