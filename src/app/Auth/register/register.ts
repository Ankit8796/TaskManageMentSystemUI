import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../../service/authservice';
import { IreturnMessage } from '../../interface/iregister';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
registerForm!:FormGroup
constructor(private formBuilder:FormBuilder,private routerService:Router,private authService:Authservice){}
  ngOnInit(): void {
    this.buildRegisterForm();
  }

  buildRegisterForm()
  {
    this.registerForm=this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    })
  }

  onSubmit()
  {
    if(this.registerForm.invalid)
    {
      return;
    }
    this.authService.registerUser(this.registerForm.value).subscribe({
      next:(result:IreturnMessage)=>{
        alert("User Register Successfully");
      },
      error:(err:IreturnMessage)=>{
        alert(err);
      }
    })
  }

  loginNow()
  {
   this.routerService.navigate(['Login']);
  }

}
