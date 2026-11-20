import { Component, OnInit } from '@angular/core';
import { Sidebarservice } from '../../service/sidebarservice';
import { Userservice } from '../../service/userservice';
import { Iuser } from '../../interface/iuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
      isSidebarToggled = false
      userData!:Iuser
  constructor(private sidebarService:Sidebarservice,private userServcie:Userservice,private router:Router){}
  ngOnInit(): void {
    this.getUserDetails();
  }


logout()
{
  sessionStorage.removeItem('token');
 this.router.navigate(['Login']);
}
 toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
toggleDropdown(event:any)
{

}

getUserDetails()
{
  this.userServcie.getUser().subscribe({
    next:(result:any)=>{
this.userData=result

console.log("header data",this.userData);
    }
  })
}

}
