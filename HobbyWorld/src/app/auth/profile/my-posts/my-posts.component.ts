import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IPost } from 'src/app/types/post';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  postsList: [string, IPost][]=[];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.apiService.getAllPosts()
      .subscribe(
        {
          next: (posts) => {
            //console.log(posts);
            this.postsList = Object.entries(posts);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            console.log('Error: ' + err);
          }
        }
      )
  }
}
