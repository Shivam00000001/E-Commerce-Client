import { Component } from '@angular/core';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  message: any;

  constructor(private userService:UserService){}
  ngOnInit(){
    this.foruser();
  }

  foruser(){
    this.userService.forUser().subscribe({
      next:(response:any) =>{
        console.log(response);
        this.message = response;
      },
      error:(err:any) => {
        console.log(err);
      }

    })
  }
}
