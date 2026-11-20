import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../interface/iuser';
import { Adminservice } from '../../service/adminservice';
import { CommonModule } from '@angular/common';
import { Itask } from '../../interface/itask';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  imports: [CommonModule],
  templateUrl: './userdetails.html',
  styleUrl: './userdetails.css',
})
export class Userdetails implements OnInit {
alluserDetails:Iuser[]=[];

constructor(private adminService:Adminservice,private routerService:Router){}
  ngOnInit(): void {
this.getAllUserDetails();
  }

  getAllUserDetails()
  {
    this.adminService.getAllusers().subscribe({
      next:(result:any)=>{
        this.alluserDetails=result
      }
    })
  }

  taskDetails(userId:string)
  {
     this.routerService.navigate([`AdminDashboard/usertask`],
      { state: { userId } }
    );
  }
}
