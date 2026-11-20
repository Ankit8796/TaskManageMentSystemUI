import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../../service/authservice';
import { IreturnMessage } from '../../interface/iregister';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private routerService: Router, private authService: Authservice) { }
  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (result: IreturnMessage) => {
        if (result.success) {
          if (result.token) {
            sessionStorage.setItem("token", result.token);
            const decodedToken: any = jwtDecode(result.token);
            const role = decodedToken.role;
            sessionStorage.setItem("role",role);

            if (role == 'Admin') {
              this.routerService.navigate(['/AdminDashboard']);
            }
            else {
              this.routerService.navigate(['/Dashboard']);

            }
          }
          else {
            alert(result.message);
          }
        }


      }, error: (err: any) => {
        alert(err.message)
      }
    })
  }
  registerNow() {
    this.routerService.navigate(['Register']);
  }


}
