// import {Injectable} from '@angular/core';
// import {AngularFireAuth} from '@angular/fire/compat/auth';
// import firebase from 'firebase/app';

// import * as auth from 'firebase/auth';
// @Injectable({
//     providedIn: 'root'
// })
// export class AuthService {
//     public userClaims: any;
//   //  public userClaims$ = new Subject<any>();

//     constructor(
//         public afAuth: AngularFireAuth,
//     ) {
//     }


//     getUserClaims(): Promise<any> {
//         return new Promise<any>((resolve, reject) => {
//             this.afAuth.onAuthStateChanged(user => {
//                 if (!!user) {
//                     this.setUserClaims(user);
//                     resolve(user);
//                 } else {
//                     reject('No user logged in');
//                 }
//             });
//         });
//     }

//     getUserToken(): Promise<string> {
//         return new Promise<string>((resolve, reject) => {
//             this.afAuth.onAuthStateChanged(user => {
//                 if (!!user) {
//                     user.getIdToken().then(token => resolve(token)).catch(() => reject('No token Available.'));
//                 } else {
//                     reject('No user logged in');
//                 }
//             });
//         });
//     }

//     setUserClaims(user: any): void {
//         this.userClaims = user;
//     //    this.userClaims$.next(user);
//     }


//     // doFacebookLogin(): Promise<any> {
//     //     return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
//     // }
//     //
//     // doTwitterLogin(): Promise<any> {
//     //     return this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
//     // }

//     doGoogleLogin(): Promise<any> {
//         return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
//     }

    





    

//     doLogout(): Promise<void> {
//         return new Promise<void>((resolve, reject) => {
//             if (!!this.afAuth.currentUser) {
//                 this.afAuth.signOut().then(() => {
//                     this.setUserClaims(null);
//                     resolve();
//                 }, err => reject(err));
//             } else {
//                 reject();
//             }
//         });
//     }

// }
import { Injectable } from '@angular/core';
import {AppUser} from "../models/User.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users : AppUser[]=[];
  public authenticatedUser : AppUser | undefined;
  constructor() {
    this.users.push({userId : UUID.UUID(),username:"admin",password :"admin","roles":['USER']});
    this.users.push({userId : UUID.UUID(),username:"user2",password :"1234","roles":['USER']})
    this.users.push({userId : UUID.UUID(),username:"admin",password :"admin","roles":['USER',"ADMIN"]});
  }
  public login(username:string, password :string):Observable<AppUser> {
    let appUser = this.users.find(u=>u.username==username);
    if(!appUser)
      return throwError(()=>new Error('User Not found'));
    if(appUser.password!=password)
      return throwError(()=>new Error('Bad Credentials'));
    return of(appUser);
  }
  public authenticateUser(user : AppUser):Observable<boolean>{
    this.authenticatedUser=user;
    localStorage.setItem("authUser", JSON.stringify({username:user.username, roles:user.roles, token : "JWT_TOKEN"}));//back njib el token 
    return of(true);
   }
  public hasRole(role : string) :boolean {
    return this.authenticatedUser!.roles.includes(role);
  }
  public logout(){
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
  public isAuthenticated():boolean{
    return this.authenticatedUser!=undefined;
  }

}