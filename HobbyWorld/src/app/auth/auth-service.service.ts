import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../types/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, updateEmail } from "firebase/auth";
import { MatSnackBar } from '@angular/material/snack-bar';
import { getDatabase, ref, set, child, get } from "firebase/database";




@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private user$$ = new BehaviorSubject<IUser | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: IUser | undefined;
  subscription: Subscription;



  get isLogged(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return true
    } else {
      return false;
    }

  }

  constructor(private http: HttpClient,
    private matSnackBar: MatSnackBar,
    private router: Router) {

    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });

  }

  register(email: string, password: string, name: string) {
    const auth = getAuth();
    let uid = '';

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        uid = response.user.uid;

        const auth = getAuth();
        const user = auth.currentUser;
        updateProfile(user!, {
          displayName: name
        })
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorMessage = "Login failed - " + error.message;
        this.matSnackBar.open(errorMessage, "OK", {
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: "'bg-danger'"
        });
      });


    function writeUserData(userId: string, name: string) {
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        username: name

      });
    }

  }

  login(data: any) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorMessage = "Login failed - " + error.message;
        this.matSnackBar.open(errorMessage, "OK", {
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: "'bg-danger'"
        });
      });

  }

  sendResetEmail(data: any) {
    const apiKey = environment.firebase.apiKey;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
      { ...data, requestType: 'PASSWORD_RESET' })
  }

  getUserData() {
    const auth = getAuth();
    return auth.currentUser;
  }

  updateUser(data: object) {
    const auth = getAuth();
    const user = auth.currentUser;
    updateProfile(user!, {
      ...data
    }).then(() => {
      this.matSnackBar.open('Profile is updated!', "OK", {
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: "'bg-success'"
      });

      this.router.navigate(['/auth/myProfile']);
    }).catch((error) => {
      this.matSnackBar.open('There is a problem -' + error.message, "OK", {
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: "'bg-danger'"
      });
    });
  }












  // getAuth()
  // .getUser(uid)
  // .then((userRecord) => {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
  // })
  // .catch((error) => {
  //   console.log('Error fetching user data:', error);
  // });




  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/']);
      localStorage.removeItem('user');
    }).catch((error) => {
      const errorMessage = "Logout failed - " + error.message;
      this.matSnackBar.open(errorMessage, "OK", {
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: "'bg-danger'"
      });
    });
  }
}
