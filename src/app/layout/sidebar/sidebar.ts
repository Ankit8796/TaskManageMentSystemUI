import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Authservice } from '../../service/authservice';
import { CommonModule } from '@angular/common';
import { Sidebarservice } from '../../service/sidebarservice';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
 role: string | null = null;
   isSidebarOpen = true;
  constructor(private authService:Authservice,private sidebarService:Sidebarservice){}
  ngOnInit(): void {
    this.role=this.authService.getRole();
    this.sidebarToggle();
  }


  sidebarToggle(){
    this.sidebarService.sidebarState$
      .subscribe((state) => {
        this.isSidebarOpen = state;
      });
  }

}
