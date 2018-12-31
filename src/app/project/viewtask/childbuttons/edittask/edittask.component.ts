import {Component, Output, EventEmitter} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { Router } from "@angular/router";
import { TaskInfoModel } from "src/app/model/taskinfo.model";
import { MessageService } from "src/app/services/message.service";
import { ViewTaskInfoModel } from "src/app/model/viewtask.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'child-editcell',
    template: `<span><button [disabled] = "isEndTask" (click)="invokeEditTask()" 
    class="btn btn-primary btn-md">Edit Task</button></span>`,
    styles: [
        `.button {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
        line-height: 0.5;
        }`
    ]
})
export class EdittaskComponent implements ICellRendererAngularComp {
    public params: any;

    @Output() editTaskDetail = new EventEmitter<TaskInfoModel>();
    @Output() editButtonEvent = new EventEmitter<boolean>();

    message:string;
    editTaskClicked: boolean;
    isEndTask : boolean;

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
        employeeId:'',
        userId:'',
        userRole:'',
        userStatus:'',
        taskStatus:''
      }
  
    agInit(params: any): void {
        this.params = params;
        if(this.params.node.data.taskStatus === 'Completed'){
            this.isEndTask = true;
          }else{
            this.isEndTask = false;
          }
    }

    constructor(private router: Router, private messageService: MessageService,
        private data: DataService){

    }

    public invokeEditTask() {
        this.viewTask.taskId = this.params.node.data.taskId;
        this.viewTask.taskName = this.params.node.data.taskName;
        this.viewTask.startDate = this.params.node.data.startDate;
        this.viewTask.endDate = this.params.node.data.endDate;
        this.viewTask.priority= this.params.node.data.priority;
        this.viewTask.parentId = this.params.node.data.parentId;
        this.viewTask.projectId = this.params.node.data.projectId;
        this.viewTask.userName = this.params.node.data.userName;
        this.viewTask.projectName = this.params.node.data.projectName;
        this.viewTask.parentTaskName = this.params.node.data.parentTaskName;
        this.viewTask.userId = this.params.node.data.userId;
        this.viewTask.userRole = this.params.node.data.userRole;
        this.viewTask.userStatus = this.params.node.data.userStatus;
        this.viewTask.employeeId = this.params.node.data.employeeId;
        this.viewTask.taskStatus = this.params.node.data.taskStatus;

        this.data.changeEditTaskInfo(this.viewTask);
        this.data.changeEditTaskClickInfo(true);
        this.router.navigateByUrl('task');
    }

    refresh(): boolean {
        return false;
    }
}