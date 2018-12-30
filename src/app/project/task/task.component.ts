import { Component, OnInit, ViewChild } from '@angular/core';
import { RestServerService } from 'src/app/services/restserver.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { ProjectInfoModel } from 'src/app/model/projectinfo.model';
import { UserInfoModel } from 'src/app/model/userinfo.model';
import { ParentTaskInfoModel } from 'src/app/model/parenttaskinfo.model';
import { Options } from 'ng5-slider';
import { NgForm } from '@angular/forms';
import { TaskInfoModel } from 'src/app/model/taskinfo.model';
import { DataService } from 'src/app/services/data.service';
import { ViewTaskInfoModel } from 'src/app/model/viewtask.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [RestServerService]
})
export class TaskComponent implements OnInit {

  editTaskClicked: boolean;
  defaultProjectName = "";
  defaultParentTask = "";
  defaultUser = "";
  defaultStartDate = "";
  defaultEndDate = "";

  @ViewChild('savetask') saveTaskForm: NgForm;
  planModel: any = { start_date: new Date(), end_date: new Date() };
  defaultaskname = "Analysis";
  submitted = false;
  isParentTask = false;
  showEdit: boolean = false;

  value: number = 10;
  options: Options = {
    floor: 0,
    ceil: 30
  };

  project: ProjectInfoModel = {
    projectId: '',
    projectName: '',
    startDate: '',
    endDate: '',
    priority: 0,
    status: ''
  };

  user: UserInfoModel = {
    firstName: '',
    lastName: '',
    employeeId: '',
    userId: '',
    projectId: '',
    taskId: '',
    role: '',
    status: ''
  };

  selectedUser: UserInfoModel = {
    firstName: '',
    lastName: '',
    employeeId: '',
    userId: '',
    projectId: '',
    taskId: '',
    role: '',
    status: ''
  }

  ptask: ParentTaskInfoModel = {
    parentId: '',
    parentTaskName: ''
  };

  task: TaskInfoModel = {
    taskId: '',
    taskName: '',
    startDate: '',
    endDate: '',
    priority: 0,
    status: '',
    parentId: '',
    projectId: ''
  };

  viewTask: ViewTaskInfoModel = {
    projectId: '',
    taskId: '',
    parentId: '',
    taskName: '',
    projectName: '',
    userName: '',
    parentTaskName: '',
    priority: 0,
    startDate: '',
    endDate: '',
    userId: '',
    userRole: '',
    userStatus: '',
    employeeId: ''
  }

  constructor(private restService: RestServerService, private router: Router,
    private messageService: MessageService,
    private data: DataService,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.data.currentEditTaskMessage.subscribe(viewTask => {
      this.viewTask = viewTask;
      this.defaultProjectName = this.viewTask.projectName;
      this.defaultParentTask = this.viewTask.parentTaskName;
      this.defaultStartDate = this.viewTask.startDate;
      this.defaultEndDate = this.viewTask.endDate;
      this.task.startDate = this.viewTask.startDate;
      this.task.endDate = this.viewTask.endDate;
      this.defaultUser = this.viewTask.userName;
      this.defaultaskname = this.viewTask.taskName;
      this.value = this.viewTask.priority;
    });
    this.data.currentEditTaskClickMessage.subscribe(editTaskClicked => this.editTaskClicked = editTaskClicked);
  }
  openSelectProjectDialog() {
    this.messageService.selectProject(
      "Select Project",
      ["Select", "Cancel"])
      .subscribe((projectDetail) => {
        this.project = projectDetail;
      });
  }

  openSelectUserDialog() {
    this.messageService.selectUser(
      "Select User",
      ["Select", "Cancel"])
      .subscribe((userDetail) => {
        this.selectedUser = userDetail;
      });
  }

  openSelectParentTaskDialog() {
    this.messageService.selectParentTask(
      "Select Parent Task",
      ["Select", "Cancel"])
      .subscribe((parentTaskDetail) => {
        this.ptask = parentTaskDetail;
      });
  }

  onSubmit() {

    this.submitted = true;

    if (this.isParentTask === true) {
      this.ptask.parentTaskName = this.saveTaskForm.value.taskname;

      this.restService.storeParentTask(this.ptask)
        .subscribe((response) => console.log(response),
          (error) => {
            console.log(error);
            throw error;
          });
    } else {

      if(typeof this.selectedUser != 'undefined'){
        if(this.selectedUser.taskId !== '0'){
          this.saveTaskForm.reset();
          throw new Error('User already assigned task#' + this.selectedUser.taskId + 
          ',hence cannot proceed further, please select another user!');
        }
      }

      this.task.taskName = this.saveTaskForm.value.taskname;
      if (typeof this.saveTaskForm.value.startdate != 'undefined') {
        this.task.startDate = this.saveTaskForm.value.startdate.year + "-" +
          this.saveTaskForm.value.startdate.month + "-" +
          this.saveTaskForm.value.startdate.day;
      }

      if (typeof this.saveTaskForm.value.enddate != 'undefined') {
        this.task.endDate = this.saveTaskForm.value.enddate.year + "-" +
          this.saveTaskForm.value.enddate.month + "-" +
          this.saveTaskForm.value.enddate.day;
      }

      this.task.priority = this.value;


      if (this.task.startDate != '' && this.task.endDate != '') {
        let newStartDate = new Date(this.task.startDate);
        let newEndDate = new Date(this.task.endDate);
        let currDate = new Date();

        if (newStartDate > newEndDate) {

          console.log('End Date should be greater than start date');
          let strMessage = "";
          strMessage = "Error Message [" + "End Date should be greater than start date" + "] Http Status Code [" + "402" + "]";
          this.saveTaskForm.reset();
          throw new Error(strMessage);

        }
        this.task.startDate = this.datepipe.transform(this.task.startDate, 'yyyy-MM-dd');
        this.task.endDate = this.datepipe.transform(this.task.endDate, 'yyyy-MM-dd');

      }

      if (typeof this.ptask.parentId != 'undefined') {
        this.task.parentId = this.ptask.parentId;
      }

      this.task.projectId = this.project.projectId;
      this.task.status = 'Not Started';

      console.log(this.saveTaskForm);
      console.log(this.task);
      this.restService.storeTask(this.task)
        .subscribe((response) => {
          this.task = response.json();
          console.log(this.task);

          this.user.projectId = this.project.projectId;
          this.user.taskId = this.task.taskId;
          this.user.role = this.selectedUser.role;
          this.user.status = this.selectedUser.status;
          this.user.firstName = this.selectedUser.firstName;
          this.user.lastName = this.selectedUser.lastName;
          this.user.userId = this.selectedUser.userId;
          this.user.employeeId = this.selectedUser.employeeId;

          this.restService.editUser(this.user)
            .subscribe((response) => console.log(response),
              (error) => {
                console.log(error);
                throw error;
              });
        },
          (error) => {
            console.log(error);
            throw error;
          });
    }

    this.saveTaskForm.reset();
    //this.router.navigateByUrl('/');
  }

  editTask() {

    if (this.isParentTask === true) {
      this.ptask.parentTaskName = this.saveTaskForm.value.taskname;

      this.restService.editParentTask(this.ptask)
        .subscribe((response) => console.log(response),
          (error) => {
            console.log(error);
            throw error;
          });
    } else {

      if((typeof this.viewTask != 'undefined') && (typeof this.selectedUser != 'undefined')){
        console.log("DEBUGGER");
        console.log(this.selectedUser);
        console.log(this.viewTask);
        
        if(this.selectedUser.firstName === ""){

        }else{
          let strName = this.selectedUser.firstName + "," + this.selectedUser.lastName;
          if(this.viewTask.userName !== strName && (this.selectedUser.taskId !== '0') && (typeof this.selectedUser.taskId !== null)){
            this.saveTaskForm.reset();
            throw new Error('User already assigned task#' + this.viewTask.taskId + 
            ',hence cannot proceed further, please select another user!');
          }
        }
        
      }

      this.task.taskName = this.saveTaskForm.value.taskname;

      if (typeof this.saveTaskForm.value.startdate != 'undefined') {
        this.task.startDate = this.saveTaskForm.value.startdate.year + "-" +
          this.saveTaskForm.value.startdate.month + "-" +
          this.saveTaskForm.value.startdate.day;
      }

      if (typeof this.saveTaskForm.value.enddate != 'undefined') {
        this.task.endDate = this.saveTaskForm.value.enddate.year + "-" +
          this.saveTaskForm.value.enddate.month + "-" +
          this.saveTaskForm.value.enddate.day;
      }

      this.task.priority = this.value;
      this.task.taskId = this.viewTask.taskId;


      if (this.task.startDate != '' && this.task.endDate != '') {
        let newStartDate = new Date(this.task.startDate);
        let newEndDate = new Date(this.task.endDate);
        let currDate = new Date();

        if (newStartDate > newEndDate) {
          console.log('End Date should be greater than start date');
          let strMessage = "";
          strMessage = "Error Message [" + "End Date should be greater than start date" + "] Http Status Code [" + "402" + "]";
          this.saveTaskForm.reset();
          throw new Error(strMessage);
        }
        if (typeof this.task.startDate != 'undefined') {
          this.task.startDate = this.datepipe.transform(this.task.startDate, 'yyyy-MM-dd');
        }

        if (typeof this.task.endDate != 'undefined') {
          this.task.endDate = this.datepipe.transform(this.task.endDate, 'yyyy-MM-dd');
        }

      }

      this.task.parentId = this.viewTask.parentId;
      this.task.projectId = this.viewTask.projectId;

      this.restService.editTask(this.task)
        .subscribe((response) => {
          this.task = response.json();

          this.user.projectId = this.task.projectId;
          this.user.taskId = this.task.taskId;
          this.user.role = this.viewTask.userRole;
          this.user.status = this.viewTask.userStatus;
          this.user.userId = this.viewTask.userId;
          this.user.employeeId = this.viewTask.employeeId;



          if (typeof this.user.firstName === 'undefined' || typeof this.user.lastName === 'undefined') {
            let toArrayUserName = this.viewTask.userName.split(",");
            this.user.firstName = toArrayUserName[0];
            this.user.lastName = toArrayUserName[1];
          } else if (this.user.firstName === '') {
            let toArrayUserName = this.viewTask.userName.split(",");
            this.user.firstName = toArrayUserName[0];
            this.user.lastName = toArrayUserName[1];
          }

          this.restService.editUser(this.user)
            .subscribe((response) => console.log(response),
              (error) => {
                console.log(error);
                throw error;
              });
        },
          (error) => {
            console.log(error);
            throw error;
          });
    }

    this.saveTaskForm.reset();
  }

  receiveEditButton(editClicked) {
    this.showEdit = editClicked;
  }

  getProjectPriority() {
    this.task.priority = this.value;
  }
}
