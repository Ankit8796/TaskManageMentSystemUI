import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const token=sessionStorage.getItem('token');

  if(token)
  {
    const DecodeToken:any=jwtDecode(token);
    const role=DecodeToken.role;

    if(role=='User' || role=='Admin')
    {
      return true
    }
     else{
      router.navigateByUrl('/login');
      return false;
    }
  }
   router.navigate(['/login']);
  return false;
};
