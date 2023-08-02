import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDatabase, ref, update, orderByChild, equalTo } from "firebase/database";
import {
  Firestore, getFirestore,
  collection, addDoc, collectionData,
  doc, updateDoc, deleteDoc, getDoc,
  getDocs, query, where
} from '@angular/fire/firestore'; 
import { environment } from 'src/environments/environment';
import { IPost } from './types/post';

import { getAuth } from 'firebase/auth';



//const {apiUrl}=environment.firebase.databaseURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  
  constructor(private http: HttpClient, private firestore: Firestore,) {
  
   }

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

  async getMyPosts() {
    const productsList:any=[];
    
    const db = getDatabase();
const auth = getAuth();
const userId = auth.currentUser!.uid;
const collectionInstance = collection(this.firestore, 'products');


const q = query(collectionInstance, where("ownerId", "==", userId));
console.log(q)
try {
  const querySnapshot = await getDocs(q);
  const productsQ = querySnapshot.docs.map((doc) => doc.data() as IPost[]);
  console.log(productsQ);
  productsList.push(...productsQ);

} catch (e) {
  console.error("Error getting products: ", e);
}
return productsList;
}
}
