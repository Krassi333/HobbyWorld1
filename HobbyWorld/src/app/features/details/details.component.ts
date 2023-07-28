import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { ApiService } from 'src/app/api.service';
import { IPost } from 'src/app/types/post';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post!: IPost;
  postId: string = '';
  isOwner: boolean = false;

  constructor(private activatedRout: ActivatedRoute,
    private apiService: ApiService,
    private matSnackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit(): void {
    this.postId = this.activatedRout.snapshot.params['postId'];
    //console.log(postId);

    this.apiService.getPostById(this.postId).subscribe(post => {
      const currentUser = getAuth().currentUser!.uid;
      // console.log(post);

      if (post.ownerId == currentUser) {
        this.isOwner = true;
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
}
