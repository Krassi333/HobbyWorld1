import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IPost } from './types/post';
import { Database, onValue, ref } from '@angular/fire/database'; 


//const {apiUrl}=environment.firebase.databaseURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private database: Database) { }

  getAllPosts() {
    return this.http.get<IPost[]>(`https://hobbyworld-93522-default-rtdb.europe-west1.firebasedatabase.app/Posts`);
  }

  getPostById(id:string){
    return this.http.get<IPost>(`https://hobbyworld-93522-default-rtdb.europe-west1.firebasedatabase.app/Posts/${id}`);
  }
   
 
}
