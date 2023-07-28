import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  constructor(private apiService: ApiService,
    private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const userId = getAuth().currentUser!.uid;
    
    this.apiService.createPost({ ...form.value, likes: 0, ownerId: userId }).subscribe({
      next: (responce) => {
        console.log(responce);
        this.router.navigate(['/features/catalog']);
      }
      //TODO error
    })

  }

  CheckboxHadle(form: NgForm) {
    console.log('here');
    //TODO


  }
}
