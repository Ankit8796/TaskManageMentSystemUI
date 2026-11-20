import { Component, OnInit } from '@angular/core';
import { Iadmindashboard } from '../../interface/iadmindashboard';
import { Adminservice } from '../../service/adminservice';


@Component({
  selector: 'app-adminhome',
  imports: [],
  templateUrl: './adminhome.html',
  styleUrl: './adminhome.css',
})
export class Adminhome implements OnInit {
  dashboardData!:Iadmindashboard;
constructor(private adminService: Adminservice){}
ngOnInit(): void {
  this.getDashboardData();
}

getDashboardData():void
{
  this.adminService.getDashboardData().subscribe({
    next:(data:Iadmindashboard)=>{
      this.dashboardData=data;
      console.log('Dashboard data:',this.dashboardData);
    },
    error:(error)=>{
      console.error('Error fetching dashboard data:',error);
    }
  });
}
}
