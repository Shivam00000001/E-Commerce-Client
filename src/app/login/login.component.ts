import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_Services/user-auth.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private userService:UserService,
     private userAuthService:UserAuthService,
     private router:Router
     ){

  }

  login(loginForm : NgForm){
    this.userService.login(loginForm.value).subscribe({
      next: (response:any) => {
      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);
      this.userAuthService.logIn = true;
      const role = response.user.role[0].roleName;
      if( role === 'Admin'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/user']);
      }
    },
      error: (err) => console.log(err),
      complete:() => console.log("Completed")
    }
    );
  }
}
