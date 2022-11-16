import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { Component, OnInit , NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authser : AuthService ,private  router : Router , private ngzone : NgZone ) { }

  ngOnInit(): void {
  }

  GOOGLE(){
    this.authser.doGoogleLogin().then(()=>{this.succesRedirect()});
  }
  
  succesRedirect (): void {
    this.ngzone.run(()=>{this.router.navigate(['/members']);}) ;
  }

}
