import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { IUser } from 'src/app/types/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileEditForm') profileEditForm!: NgForm;

  isEditMode: boolean = false;
  userData: any;
  email: string = '';
username: string = '';

  constructor(private afAuth: AngularFireAuth,
    private authService: AuthService) { }

  ngOnInit() {
     this.userData=this.authService.getUserData();
     console.log(this.userData);
     
     //this.email = userData?.email;
    
    // this.authService.getUsername().then((snapshot) => {
    //   if (snapshot.exists()) {
    //     this.username = snapshot.val().username;
    //     return '';
    //   } else {
    //     return "No data available";
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
 
  }


  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

onSubmit(profileEditForm:NgForm){
  console.log(profileEditForm.value);
  this.authService.updateUser(profileEditForm.value);
  this.isEditMode = !this.isEditMode;
  
}
}