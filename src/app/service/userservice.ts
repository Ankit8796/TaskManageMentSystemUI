import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { IBulkupdateStatus, IFilterUserTask, Itask } from '../interface/itask';
import { Iuser } from '../interface/iuser';
import { IreturnMessage } from '../interface/iregister';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private baseUrl='https://localhost:7164/api'

  private userDataSubject=new BehaviorSubject<Iuser|null>(null);

  user$:Observable<Iuser|null>=this.userDataSubject.asObservable();


  constructor(private http:HttpClient){}

  //state management method

  setUser(user:Iuser)
  {
    this.userDataSubject.next(user);
  }

  getUser()
  {
    return this.user$
  }

  getUserDetails():Observable<Iuser>
  {
   
   
    return this.http.get<Iuser>(`${this.baseUrl}/User/GetUserDetails`);
  }

  getAllTasks(FilterUserTask:IFilterUserTask):Observable<Itask>
  {
     let params = new HttpParams();
     if(FilterUserTask.Search)
    {
      params=params.set('search',FilterUserTask.Search);
    }
    if(FilterUserTask.Status)
    {
      params=params.set('status',FilterUserTask.Status);
    }
    if(FilterUserTask.Priority)
    {
      params=params.set('priority',FilterUserTask.Priority);
    }
    if(FilterUserTask.pageNumber)
    {
      params=params.set('pageNumber',FilterUserTask.pageNumber);
    }
    if(FilterUserTask.sortBy)
    {
      params=params.set('sortBy',FilterUserTask.sortBy);
    }
    if(FilterUserTask.sortOrder)
    {
      params=params.set('sortOrder',FilterUserTask.sortOrder);
    }
    return this.http.get<Itask>(`${this.baseUrl}/User/GetAllTask`,{params});
  }

  //task Crud Api Call
  
  createTask(userTask:Itask):Observable<IreturnMessage>
  {
    return this.http.post<IreturnMessage>(`${this.baseUrl}/User/CreateTask`,userTask);
  }

  updateTask(userTask:Itask):Observable<IreturnMessage>
  {
    return this.http.put<IreturnMessage>(`${this.baseUrl}/User/UpdateTask`,userTask);
  }

  updateBulkstatus(status:IBulkupdateStatus):Observable<IreturnMessage>
  {
    return this.http.put<IreturnMessage>(`${this.baseUrl}/User/UpdateTaskStatus`,status);
  }

  //task Crud Api Call End
}
