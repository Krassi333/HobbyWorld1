import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDatabase, ref, update } from "firebase/database";

import { environment } from 'src/environments/environment';
import { IPost } from './types/post';
import { Database, } from '@angular/fire/database';


//const {apiUrl}=environment.firebase.databaseURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private database: Database) { }

  getAllPosts() {
    return this.http.get<IPost[]>(`https://hobbyworld-93522-default-rtdb.europe-west1.firebasedatabase.app/Posts.json`);
  }

  getPostById(id: string) {
    return this.http.get<IPost>(`https://hobbyworld-93522-default-rtdb.europe-west1.firebasedatabase.app/Posts/${id}/.json`);
  }

  createPost(data: IPost) {
    return this.http.post<IPost>('https://hobbyworld-93522-default-rtdb.europe-west1.firebasedatabase.app/Posts.json', { ...data });
  }

  updatePost(postId: string, data: {}) {
    // Get a reference to the specific post
    const db = getDatabase();
    const postRef = ref(db, '/Posts/' + postId);
    console.log('data in service ' + Object.keys(data));
    // Update the post data
    return update(postRef, data);
  }

  deletePost(postId:string){
    return this.http.delete(`https://hobbyworld-93522-default-rtdb.europe-west1.firebasedatabase.app/Posts/${postId}/.json`)
  }
}
