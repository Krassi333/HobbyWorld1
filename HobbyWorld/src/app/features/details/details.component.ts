import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { ApiService } from 'src/app/api.service';
import { IPost } from 'src/app/types/post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth-service.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post!: IPost;
  postId: string = '';
  isOwner: boolean = false;
  likeIsShown:boolean=true;

  constructor(private activatedRout: ActivatedRoute,
    private apiService: ApiService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private authServise:AuthService
    ) 
    {

  }

  ngOnInit(): void {
    this.postId = this.activatedRout.snapshot.params['postId'];
  
    this.apiService.getPostById(this.postId).subscribe(post => {
      const currentUser = getAuth().currentUser!.uid;

      if (post.ownerId == currentUser) {
        this.isOwner = true;
        this.likeIsShown=false;
      }      

      if(!this.isOwner && post.likes.includes(currentUser)){
        this.likeIsShown=false;
      }

      this.post = post;
    })
  }

  deletePost(postId: string) {
    this.apiService.deletePost(postId).subscribe({
      next: (responce) => {
        console.log(responce);
        
        this.matSnackBar.open('Successfuly deleted!', "OK", {
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: "'bg-success'"
        });

        this.router.navigate([`/features/catalog`]);
      }

    })
  }

  onLike(){
     this.likeIsShown = !this.likeIsShown;
     const currentUser = getAuth().currentUser!.uid;
     const userData:any=this.authServise.getUserData();
     console.log('userData '+Object.keys(userData));
     
     let newList:[string]=this.post.likes;
     newList.push(currentUser);
    
    console.log(this.authServise.likePost({likedPosts:newList}));


    this.apiService.updatePost(this.postId, {likes:newList}).then(() => {

      this.matSnackBar.open('You liked the post!', "OK", {
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: "'bg-sucsess'"
      });

      this.router.navigate([`/features/details/${this.postId}`]);
    })
      .catch((error) => {
        console.error();
        const errorMessage = 'Error:' + error.message;
        this.matSnackBar.open(errorMessage, "OK", {
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: "'bg-danger'"
        });
      });
;
    

  }
}
