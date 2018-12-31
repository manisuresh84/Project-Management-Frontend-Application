import { Component, OnInit } from '@angular/core';
import { RestServerService } from 'src/app/services/restserver.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { ProjectInfoModel } from 'src/app/model/projectinfo.model';
import { TaskInfoModel } from 'src/app/model/taskinfo.model';
import { ParentTaskInfoModel } from 'src/app/model/parenttaskinfo.model';
import { ViewTaskInfoModel } from 'src/app/model/viewtask.model';
import { EdittaskComponent } from './childbuttons/edittask/edittask.component';
import { EndtaskComponent } from './childbuttons/endtask/endtask.component';


@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css'],
  providers: [RestServerService]
})
export class ViewtaskComponent implements OnInit {

  project: ProjectInfoModel = {
    projectId: '',
    projectName: '',
    startDate: '',
    endDate: '',
    priority: 0,
    status:''
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

  tasks: TaskInfoModel[] = [];
  viewtasks: ViewTaskInfoModel[] = [];
  viewtask: ViewTaskInfoModel = {
    projectId: '',
    taskId: '',
    parentId: '',
    taskName: '', 
    parentTaskName: '', 
    priority: 0, 
    startDate: '',
    endDate: '',
    userName: '',
    projectName: '',
    userId:'',
    userRole:'',
    userStatus:'',
    employeeId:'',
    taskStatus:''
  };

  ptask: ParentTaskInfoModel = {
    parentId: '',
    parentTaskName: ''
  };

  // columnDefs = [
  //   { headerName: 'Project Id', field: 'projectId' },
  //   { headerName: 'Project Name', field: 'projectName' },
  //   { headerName: 'Priority', field: 'priority' },
  //   { headerName: 'Start', field: 'startDate' },
  //   { headerName: 'End', field: 'endDate' }
  // ];

  rowData = [];

  columnDefs = [
    { headerName: 'Task', field: 'taskName' },
    { headerName: 'Parent', field: 'parentTaskName' },
    { headerName: 'Priority', field: 'priority' },
    { headerName: 'Start', field: 'startDate' },
    { headerName: 'End', field: 'endDate' },
    { headerName: '', field: '', width: 90, cellRenderer: 'edittaskComponent'},
    { headerName: '', field: '', width: 90, cellRenderer: 'endtaskComponent'}
  ];

  frameworkComponents = {
    edittaskComponent: EdittaskComponent,
    endtaskComponent: EndtaskComponent
  };

  context = { componentParent: this };

  constructor(private restService: RestServerService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  searchProject() {
    this.messageService.selectProject(
      "Select Project",
      ["Select", "Cancel"])
      .subscribe((projectDetail) => {
        this.project = projectDetail;
        if (typeof this.project.projectId != 'undefined') {
        this.restService.getViewProjectTasks(this.project.projectId)
          .subscribe((response) => {
            this.viewtasks = response;
            console.log(this.viewtasks);
            this.rowData = this.viewtasks;
          }
            ,
            (error) => {
              throw error;
            });
      }
      });
  }

}
