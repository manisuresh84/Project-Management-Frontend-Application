import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ViewProjectInfoModel } from 'src/app/model/viewproject.model';
import { NgForm } from '@angular/forms';
import { RestServerService } from 'src/app/services/restserver.service';
import { Router } from '@angular/router';
import { ProjectInfoModel } from 'src/app/model/projectinfo.model';

@Component({
  selector: 'app-project-transaction',
  templateUrl: './project-transaction.component.html',
  styleUrls: ['./project-transaction.component.css']
})
export class ProjectTransactionComponent implements OnInit {

  @Input('value') value: ViewProjectInfoModel;
  @ViewChild('usertransaction') userTransForm: NgForm;

  @Output() projectEditEvent = new EventEmitter<ViewProjectInfoModel>();

  @Output() editButtonEvent = new EventEmitter<boolean>();

  project: ProjectInfoModel = {
    projectId: '',
    projectName: '',
    startDate: '',
    endDate: '',
    priority: 0,
    status: ''
  };
  
  viewProject : ViewProjectInfoModel = {
    projectId: '',
    userId : '',
    userName: '',
    projectName: '', 
    priority: 0, 
    startDate: '',
    endDate: '',
    totalTaskCount: 0,
    totalCompletedTaskCount : 0,
    employeeId: '',
    userStatus:'',
    userRole:''
  }


  sendMessage() {

  }

  constructor(private restService: RestServerService, private router: Router) { }

  ngOnInit() {
  }

  onEditProject() {

    this.viewProject.projectName = this.value.projectName;
    this.viewProject.projectId = this.value.projectId;
    this.viewProject.priority = this.value.priority;
    this.viewProject.startDate = this.value.startDate;
    this.viewProject.endDate = this.value.endDate;
    this.viewProject.userName = this.value.userName;
    this.viewProject.employeeId = this.value.employeeId;
    this.viewProject.userId = this.value.userId;
    this.viewProject.userStatus = this.value.userStatus;
    this.viewProject.userRole = this.value.userRole;

    console.log(this.viewProject);
    this.projectEditEvent.emit(this.viewProject);
    this.editButtonEvent.emit(true);
  }

  onSuspendProject() {
    this.project.projectName = this.value.projectName;
    this.project.projectId = this.value.projectId;
    this.project.priority = this.value.priority;
    this.project.startDate = this.value.startDate;
    this.project.endDate = this.value.endDate;
    this.project.status = 'Suspended';

    this.restService.editProject(this.project)
      .subscribe((response) => console.log(response),
        (error) => {
          console.log(error);
          throw error;
        });
  }
}
