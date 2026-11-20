import { Routes } from '@angular/router';
import { Login } from './Auth/login/login';
import { Register } from './Auth/register/register';
import { User } from './component/user/user';
import { authGuard } from './guard/auth-guard';
import { Dashboard } from './layout/dashboard/dashboard';
import { Userdashboard } from './component/userdashboard/userdashboard';
import { Admindashboard } from './admin/admindashboard/admindashboard';
import { Userdetails } from './admin/userdetails/userdetails';
import { Usertask } from './admin/usertask/usertask';
import { Adminhome } from './admin/adminhome/adminhome';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Login' },
    { path: 'Register',loadComponent:()=>import('./Auth/register/register').then(m=>m.Register) },
    { path: 'Login',loadComponent: () => import('./Auth/login/login').then(m => m.Login)},

    {
        path: 'Dashboard', loadComponent: () => import('./layout/dashboard/dashboard').then(m => m.Dashboard), canActivate: [authGuard],
        children: [
            { path: '', title: 'Dashboard',loadComponent: () => import('./component/userdashboard/userdashboard').then(m => m.Userdashboard), canActivate: [authGuard] },
            { path: 'task', title: 'usertask',loadComponent: () => import('./component/user/user').then(m => m.User), canActivate: [authGuard] }
        ]
    },
    {
        path: 'AdminDashboard', loadComponent: () => import('./admin/admindashboard/admindashboard').then(m => m.Admindashboard), canActivate: [authGuard],
        children: [
            { path: '', title: 'AdminPage', loadComponent: () => import('./admin/adminhome/adminhome').then(m => m.Adminhome) },
            { path: 'users', title: 'UserPage', loadComponent: () => import('./admin/userdetails/userdetails').then(m => m.Userdetails), canActivate: [authGuard] },
            { path: 'usertask', title: 'AllTasks', loadComponent: () => import('./admin/usertask/usertask').then(m => m.Usertask), canActivate: [authGuard] }
        ]

    },


];
