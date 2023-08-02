import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { map } from 'rxjs';
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
  userId:string='';

  constructor(private apiService: ApiService) {
    const auth = getAuth();
    this.userId= auth.currentUser!.uid;
  }
  ngOnInit(): void {

    console.log(this.apiService.getMyPosts());
    
      
}
}
