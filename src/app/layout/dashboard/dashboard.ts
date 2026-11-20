import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';
import { Sidebarservice } from '../../service/sidebarservice';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Header,Sidebar,RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
    isSidebarCollapsed = false;

  constructor(private sidebarService:Sidebarservice) {}

  ngOnInit() {
  }
}
