import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { IPost } from 'src/app/types/post';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  postsList: [string, IPost][]=[];

  isLoading: boolean = true;
  userId: string = '';

  constructor(private http: HttpClient) {
    const auth = getAuth();
    this.userId = auth.currentUser!.uid;
  }

  ngOnInit(): void {
    this.getMyPosts(this.userId);
  }

  getMyPosts(userId: string) {
    const encodedUserId = encodeURIComponent(userId);
    this.http.get<{ [key: string]: IPost }>(`https://hobbyworld-93522-default-rtdb.europe-west1.firebasedatabase.app/Posts.json?orderBy="ownerId"&equalTo="${encodedUserId}"`)
      .subscribe(
        (data) => {
          // Handle the data here, 'data' will contain the response from the server
          this.postsList = Object.entries(data);
          this.isLoading = false; // Set isLoading to false after data retrieval
          
        },
        (error) => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
          this.isLoading = false; // Set isLoading to false in case of error too
        }
      );
  }
}
