// import { Router } from '@angular/router';

// import { AuthService } from './../../services/auth.service';
// import { Component, OnInit , NgZone } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   constructor(private authser : AuthService ,private  router : Router , private ngzone : NgZone ) { }

//   ngOnInit(): void {
//   }

//   GOOGLE(){
//     this.authser.doGoogleLogin().then(()=>{this.succesRedirect()});
//   }
  
//   succesRedirect (): void {
//     this.ngzone.run(()=>{this.router.navigate(['/members']);}) ;
//   }

// }
import { Component, OnInit,NgZone } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
 import { AuthService } from './../../services/auth.service';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private authService : AuthService, private router : Router, private ngzone : NgZone ) { }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username : this.fb.control(null),
      password : this.fb.control(null)
    });
  }


  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password=this.userFormGroup.value.password;
    this.authService.login(username,password).subscribe({
      next : (data)=>{
        this.authService.authenticateUser(data).subscribe({
          next : (data)=>{
            this.router.navigateByUrl("/dashboard");
          }
        })
      }
    })
  }
}