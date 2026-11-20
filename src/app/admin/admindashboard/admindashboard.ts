import { Component } from '@angular/core';
import { Header } from "../../layout/header/header";
import { Sidebar } from "../../layout/sidebar/sidebar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admindashboard',
  imports: [Header, Sidebar, RouterOutlet],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard {

}
