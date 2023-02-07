import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_Services/user-auth.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userAuthService:UserAuthService,
    private router:Router,
    public userService: UserService
    ){

  }


  public isLoggedIn(){
    return  !this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.userAuthService.logIn = false;
    this.router.navigate(['/home']);
  }

  public isLoggedOut(){
    return !this.isLoggedIn();
  }

}
