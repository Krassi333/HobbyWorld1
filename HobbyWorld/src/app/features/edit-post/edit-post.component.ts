import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { IPost } from 'src/app/types/post';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post!: IPost;
  postId: string = '';


  constructor(private activatedRout: ActivatedRoute,
    private apiService: ApiService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.postId = this.activatedRout.snapshot.params['postId'];

    this.apiService.getPostById(this.postId).subscribe((post) => {
      console.log(post.title);
      //TODO error with title in console
      this.post = post;
    })

  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.apiService.updatePost(this.postId, form.value).then(() => {
      console.log('Post updated successfully!');

      this.matSnackBar.open('Post updated successfully!', "OK", {
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: "'bg-sucsess'"
      });

      this.router.navigate([`/features/details/${this.postId}`]);
    })
      .catch((error) => {
        console.error();
        const errorMessage = 'Error updating post:' + error.message;
        this.matSnackBar.open(errorMessage, "OK", {
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: "'bg-danger'"
        });
      });;
  }
}
