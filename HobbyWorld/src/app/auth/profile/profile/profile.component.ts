import { Component, OnInit, ViewChild } from '@angular/core';

import { IUser } from 'src/app/types/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AuthService } from '../../auth-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileEditForm') profileEditForm!: NgForm;

  isEditMode: boolean = false;
  userData: any;
  //likedPosts: any;

  constructor(private apiService:ApiService,
    private authService: AuthService) { }

  ngOnInit() {
     this.userData=this.authService.getUserData();

  
   // this.likedPosts=this.userData.likedPosts;
   //this.likedPosts=['test'];
   // console.log(this.likedPosts);
    
     
  }


  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

onSubmit(profileEditForm:NgForm){
  console.log(profileEditForm.value);
  this.authService.update_User(profileEditForm.value);
  this.isEditMode = !this.isEditMode;
  
}
}
