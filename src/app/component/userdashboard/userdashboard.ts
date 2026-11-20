import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../interface/iuser';
import { Userservice } from '../../service/userservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userdashboard',
  imports: [CommonModule],
  templateUrl: './userdashboard.html',
  styleUrl: './userdashboard.css',
})
export class Userdashboard  implements OnInit{
userData: Iuser | null = null;
 constructor(private userService:Userservice){}
  ngOnInit(): void {
   this.userDetail();
  }

   userDetail()
  {
    this.userService.getUserDetails().subscribe({
      next:(result:any)=>{
        this.userData=result
        this.userService.setUser(result);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

}
