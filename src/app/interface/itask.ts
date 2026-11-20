import { Priority, Status } from "../enums/status";

export interface Itask {
    id:number,
    title:string,
    description:string,
    dueDate:string,
    status:Status,
    priority:Priority
}

export interface IFilterUserTask
{
   
    Search:string;
    Status:Status| null;
    Priority:Priority| null;
    pageNumber: number;
    sortBy:string;
    sortOrder:string;
}
export interface IBulkupdateStatus
{
  taskIds:number[];
  status:Status
}