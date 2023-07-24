import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private apiService: ApiService, private authService: AuthService) {

  }

  get isLoggedIn(): boolean {
    return this.authService.isLogged;
  }
  
  ngOnInit(): void {
    // this.apiService.getAllPosts().subscribe({
    //   next: (posts) => {
    //     console.log(posts);

    //   }
    // })
  }

}