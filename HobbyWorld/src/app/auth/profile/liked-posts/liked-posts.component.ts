import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IPost } from 'src/app/types/post';
import { AuthService } from '../../auth-service.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.css']
})
export class LikedPostsComponent implements OnInit {
  postsList: any[]=[];
  filteredPosts: any[] = [];
  isLoading: boolean = true;
  userId:string='';
  //@Input() likedPosts:any;
  
  constructor(private apiService: ApiService,
    private authService:AuthService) {

  }
  ngOnInit(): void {
    const auth = getAuth();
    this.userId = auth.currentUser!.uid;

    this.apiService.getAllPosts()
      .subscribe({
        next: (posts) => {
          //console.log(Object.entries(posts));
          
          this.postsList = Object.entries(posts);
          //console.log(this.postsList);
          this.isLoading = false;
         this.filteredPosts = this.postsList.filter(postsList => postsList[1].likes.includes(this.userId));
    
        },
        error: (err) => {
          this.isLoading = false;
          console.log('Error: ' + err);
        }
      });

      
      
      
  }
}
