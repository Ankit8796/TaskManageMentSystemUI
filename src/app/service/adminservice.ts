import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Iuser } from '../interface/iuser';
import { IFilterUserTask, Itask } from '../interface/itask';
import { IreturnMessage } from '../interface/iregister';
import { Iadmindashboard } from '../interface/iadmindashboard';

@Injectable({
  providedIn: 'root',
})
export class Adminservice {
    private baseUrl='https://localhost:7164/api'
    constructor(private http:HttpClient){}

    getAllusers():Observable<Iuser>
    {
      return this.http.get<Iuser>(`${this.baseUrl}/Admin/GetAllUsers`);
    }

    getAllTasks(userId:string,taskFilter:IFilterUserTask):Observable<Itask>
    {
      let params=new HttpParams();

      if(taskFilter.Search)
        params=params.set('search',taskFilter.Search);

      if(taskFilter.Status)
        params=params.set('status',taskFilter.Status);

      if(taskFilter.Priority)
        params=params.set('priority',taskFilter.Priority);
      if(taskFilter.sortBy)
        params=params.set('sortBy',taskFilter.sortBy);
      if(taskFilter.sortOrder)
        params=params.set('sortOrder',taskFilter.sortOrder);

      if(taskFilter.pageNumber)
        params=params.set('pageNumber',taskFilter.pageNumber);

       return this.http.get<Itask>(`${this.baseUrl}/Admin/GetUserTasks/${userId}`,{params});
    }

    deleteTask(userId:string,taskId:number):Observable<IreturnMessage>
    {
      return this.http.delete<IreturnMessage>(`${this.baseUrl}/Admin/DeleteUserTask/${userId}/${taskId}`);
    }

    deleteMultipleTask(userId:string,taskIds:number[]):Observable<IreturnMessage>
    {
      return this.http.delete<IreturnMessage>(`${this.baseUrl}/Admin/DeleteMultipleTasks/${userId}`, { body: taskIds });
    }

    getDashboardData():Observable<Iadmindashboard>
    {
      return this.http.get<Iadmindashboard>(`${this.baseUrl}/Admin/GetDashboardSummary`);
    }
}
