import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { IPost } from 'src/app/types/post';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  @Input() post!: IPost;

  postsList: [string, IPost][]=[];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.apiService.getAllPosts()
      .subscribe({
        next: (posts) => {
          console.log(Object.entries(posts));
          
          this.postsList = Object.entries(posts);
          console.log(this.postsList);
          this.isLoading = false;
         
        },
        error: (err) => {
          this.isLoading = false;
          console.log('Error: ' + err);
        }
      })
  }

}

