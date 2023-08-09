import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IPost } from 'src/app/types/post';
import { AuthService } from '../../auth-service.service';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.css']
})
export class LikedPostsComponent implements OnInit {
  postsList: any;
  isLoading: boolean = true;
  //@Input() likedPosts:any;
  
  constructor(private apiService: ApiService,
    private authService:AuthService) {

  }
  ngOnInit(): void {
   const userData=this.authService.getUserData();

    this.apiService.getLikedPosts(userData!.uid).subscribe((r)=>{
      console.log('type of r '+typeof r);
      console.log(Object.values(r));
      
     const  posts = Object.values(r);
      console.log('liked post list '+ posts);
      
      for(let i of posts){
        console.log('i '+i);
        if(i != null){
          this.apiService.getPostById(i).subscribe((p)=>{
          if(p != null){
            this.postsList.push(p);
          }
          
        })
        }
        
      };
console.log('-----------');

      console.log(this.postsList);
      
      
     });
    
  }
}
