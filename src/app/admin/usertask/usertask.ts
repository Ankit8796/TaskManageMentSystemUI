import { Component, OnInit } from '@angular/core';
import { Adminservice } from '../../service/adminservice';
import { Router } from '@angular/router';
import { IFilterUserTask, Itask } from '../../interface/itask';
import { FormsModule } from '@angular/forms';
import { Priority, Status } from '../../enums/status';
import { CommonModule } from '@angular/common';
import { IreturnMessage } from '../../interface/iregister';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usertask',
  imports: [FormsModule, CommonModule],
  templateUrl: './usertask.html',
  styleUrl: './usertask.css',
})
export class Usertask implements OnInit {
  userId!: string
  statusEnum = Status;
  priorityEnum = Priority;
  searchText: string = '';
  sortBy: string = '';
  sortOrder: string = 'asc';
  statusDropdown: { id: number; name: string }[] = [];
  priorityDropdown: { id: number; name: string }[] = [];
  selectedStatus: Status | null = null;
  selectedPriority: Priority | null = null;
  userTasks: Itask[] = [];
  showDropdown = false;
  selectedTaskIds: number[] = [];
  selectedTask:Itask | null = null;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  pageSize = 0;
  pages: number[] = [];
  constructor(private adminService: Adminservice, private routerService: Router,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllTask();
    this.generateStudentStatus();
    this.generateTaskPriority();
  }

  generateStudentStatus() {
    this.statusDropdown = [
      { id: Status.Pending, name: 'Pending' },
      { id: Status.Completed, name: 'Completed' }
    ];
  }

  generateTaskPriority() {
    this.priorityDropdown = [
      { id: Priority.Low, name: 'Low' },
      { id: Priority.Medium, name: 'Medium' },
      { id: Priority.High, name: 'High' }
    ];
  }


  DeleteAllTask() {
    console.log("selected task ids", this.selectedTaskIds);
    this.showDropdown = false;
  }

  searchUserTask(event: any) {
    const input = (event.target as HTMLInputElement).value.trim();
    this.searchText = input;
    this.getAllTask();
  }

  applyStatusFilter() {
    if (this.selectedStatus == null || !this.selectedPriority == null) {
      return;
    }
    this.getAllTask();

  }

  resetFilter() {
    const isDefault =
      this.searchText === '' &&
      this.selectedStatus === null &&
      this.selectedPriority === null &&
      this.currentPage === 1;

    if (isDefault) {
      // this.toastr.info("Nothing to reset");
      return;
    }
    this.searchText = '';
    this.selectedStatus = null;
    this.selectedPriority = null;
    this.currentPage = 1;
    this.getAllTask();
  }

  onSort(fieldName: any) {

  }
  onCheckboxChange(event: any, taskId: number) {
    if (event.target.checked) {
      this.selectedTaskIds.push(taskId);
    }
    else {
      this.selectedTaskIds = this.selectedTaskIds.filter(id => id !== taskId);
    }
    this.showDropdown = true;
  }

  viewTaskDetails(task:Itask)
  {debugger
    this.selectedTask=task;
    console.log(this.selectedTask);
  }

  closeModal()
  {
    this.selectedTask=null;
  }



generatePageNumber() {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

onPageChange(page: number)
{debugger
  this.currentPage = page;
  this.getAllTask();
}



  getAllTask() {
    this.userId = history.state.userId;
    const taskFilter: IFilterUserTask = {

      Search: this.searchText,
      Status: this.selectedStatus,
      Priority: this.selectedPriority,
      pageNumber: this.currentPage,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder


    };
    if (this.userId == null) {
      this.routerService.navigate(['AdminDashboard/users']);
      return;
    }
    this.adminService.getAllTasks(this.userId, taskFilter).subscribe({
      next: (result: any) => {
        this.userTasks = result.data;
        this.currentPage = result.pageNumber;
         this.totalPages = result.totalPages;
        this.totalRecords = result.totalRecords;
        this.pageSize = result.pageSize
        console.log("usertask", this.userTasks);
      }
    })
  }

  deleteuserTask(taskId:number)
  {debugger
    this.adminService.deleteTask(this.userId, taskId).subscribe({
      next:(result:IreturnMessage)=>{
       this.toastr.success(result.message);
        this.selectedTaskIds =
          this.selectedTaskIds.filter(id => id !== taskId);
        this.getAllTask();
      },
      error:(err)=>{
        const errorMessage =
        err?.error?.message ||
        'An error occurred while deleting the task. Please try again.';
      this.toastr.error(errorMessage);
      }
    });
  }

  deleteMultipleTask()
  {
    if(this.selectedTaskIds.length==0)    {
      this.toastr.info('Select tasks to delete');
      return;
    }
    this.adminService.deleteMultipleTask(this.userId,this.selectedTaskIds).subscribe({
      next:(result:IreturnMessage)=>{
        this.toastr.success(result.message);
        this.getAllTask();
        this.selectedTaskIds=[];
        this.showDropdown=false;
      },
      error:(err)=>{
        const errorMessage =
        err?.error?.message ||
        'An error occurred while deleting the tasks. Please try again.';
      this.toastr.error(errorMessage);
      }
    });
  }
}
