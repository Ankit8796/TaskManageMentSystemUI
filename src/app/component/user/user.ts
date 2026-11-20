import { Component, OnInit } from '@angular/core';
import { Userservice } from '../../service/userservice';
import { CommonModule } from '@angular/common';
import { IBulkupdateStatus, IFilterUserTask, Itask } from '../../interface/itask';
import { Priority, Status } from '../../enums/status';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IreturnMessage } from '../../interface/iregister';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  taskDetails: Itask[] = [];
  statusEnum = Status;
  userName: string = '';
  priorityEnum = Priority;
  searchText: string = '';
  sortBy: string = '';
  sortOrder: string = 'asc';
  statusDropdown: { id: number; name: string }[] = [];
  priorityDropdown: { id: number; name: string }[] = [];
  selectedStatus: Status | null = null;
  selectedStatus1: Status | null = null;
  selectedPriority: Priority | null = null;
  isEditMode: boolean = false;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  pageSize = 0;
  pages: number[] = [];
  usertaskForm!: FormGroup
  selectedTaskIds: number[] = [];
  selectedTask: Itask | null = null;
  showDropdown = false;
  constructor(private formBuilder: FormBuilder, private userService: Userservice, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.buildUserTask();
    this.getAllTask();
    this.generateStudentStatus();
    this.generateTaskPriority();
  }

  buildUserTask() {
    this.usertaskForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    })
  }


  getAllTask() {
    const taskFilter: IFilterUserTask = {

      Search: this.searchText,
      Status: this.selectedStatus,
      Priority: this.selectedPriority,
      pageNumber: this.currentPage,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder


    };
    this.userService.getAllTasks(taskFilter).subscribe({
      next: (result: any) => {
        this.taskDetails = result.data;
        this.totalPages = result.totalPages;
        this.totalRecords = result.totalRecords;
        this.pageSize = result.pageSize
        this.generatePageNumber();
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  onCheckboxChange(event: any, taskid: number) {
    if (event.target.checked) {
      this.selectedTaskIds.push(taskid);
    }
    else {
      this.selectedTaskIds = this.selectedTaskIds.filter(id => id !== taskid);
    }
    this.showDropdown = this.selectedTaskIds.length > 0;
  }

  updateStatus() {
    if (!this.selectedStatus1 || this.selectedTaskIds.length === 0) {
      alert('Select tasks and status');
      return;
    }
    const payload: IBulkupdateStatus = {
      taskIds: this.selectedTaskIds,
      status: this.selectedStatus1
    };
    this.userService.updateBulkstatus(payload).subscribe({
      next: (result: IreturnMessage) => {
        this.toastr.success("Status Updated Successfully");
        this.getAllTask();
        this.selectedTaskIds = [];
        this.selectedStatus1 = null;
        this.showDropdown = false;
      },
      error: (err) => {

      const errorMessage =
        err?.error?.message ||
        err?.error ||
        'Something went wrong';

      this.toastr.error(errorMessage);
    }
    })

  }

  onSort(fieldName: any) {
    this.sortBy = fieldName;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.getAllTask();
  }

  generatePageNumber() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1)
  }

  onPageChange(pageNumber: number) {
   
    this.currentPage = pageNumber
    this.getAllTask();
  }

  searchUserTask(event: any) {
    // const input=event.target.value.toLowerCase();
    const input = (event.target as HTMLInputElement).value.trim();
    this.searchText = input;
    this.getAllTask();
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

  applyStatusFilter() {
   
    if (!this.selectedStatus && !this.selectedPriority) {
      this.toastr.warning("Select Filter First");
      return;
    }
    this.getAllTask();
  }

  OnSubmit() {
    if (this.usertaskForm.invalid) {
      this.usertaskForm.markAllAsTouched();
      return;
    }
    if (this.isEditMode) {
      this.updateUserTask();
    }
    else {
      this.userService.createTask(this.usertaskForm.value).subscribe({
        next: (result: IreturnMessage) => {
          this.toastr.success('Task Created!', 'Success');
        },
        error: (err: any) => {
          console.log(err);
        }
      })
      this.closeModel();
      this.usertaskForm.reset();
      this.getAllTask();
    }

  }

  resetFilter() {
    const isDefault =
      this.searchText === '' &&
      this.selectedStatus === null &&
      this.selectedPriority === null &&
      this.currentPage === 1;

    if (isDefault) {
      this.toastr.info("Nothing to reset");
      return;
    }
    this.searchText = '';
    this.selectedStatus = null;
    this.selectedPriority = null;
    this.currentPage = 1;
    this.getAllTask();
  }

  openAddModal() {
    this.isEditMode = false;
    this.usertaskForm.reset();
    this.openModal();
  }

  editTask(task: Itask) {
    this.isEditMode = true;
    const formattedDate = task.dueDate
      ? task.dueDate.split('T')[0]
      : '';
    this.usertaskForm.patchValue({
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: formattedDate,
      status: task.status,
      priority: task.priority

    })
    this.openModal();
  }

  updateUserTask() {
    this.userService.updateTask(this.usertaskForm.value).subscribe({
      next: (result: IreturnMessage) => {
        this.toastr.success('Task Updated!', 'Success');
        this.usertaskForm.reset();
        this.closeModel();
        this.isEditMode = false;
        this.getAllTask();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  openModal() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }

  }
  closeModel() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  viewTask(task: Itask) {
     this.selectedTask=task;
  }
}
