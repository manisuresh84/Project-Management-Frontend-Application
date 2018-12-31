import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { RestServerService } from "src/app/services/restserver.service";
import { TaskInfoModel } from "src/app/model/taskinfo.model";
import { Router } from "@angular/router";

@Component({
    selector: 'child-endtaskcell',
    template: `<span><button [disabled] = "isEndTask" (click)="invokeEndTask()" 
    class="btn btn-primary btn-md">End Task</button></span>`,
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
    ],
  providers:[RestServerService]
})
export class EndtaskComponent implements ICellRendererAngularComp {
    public params: any;
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

    constructor(private restService: RestServerService, private router: Router){

    }

    agInit(params: any): void {
        this.params = params;

        if(this.params.node.data.taskStatus === 'Completed'){
          this.isEndTask = true;
        }else{
          this.isEndTask = false;
        }

    }

    public invokeEndTask() {
      console.log('In invokeEndTask...');
      console.log(this.params.node.data);
      this.task.taskId = this.params.node.data.taskId;
      this.task.taskName = this.params.node.data.taskName;
      this.task.startDate = this.params.node.data.startDate;
      this.task.endDate = this.params.node.data.endDate;
      this.task.priority= this.params.node.data.priority;
      this.task.parentId = this.params.node.data.parentId;
      this.task.projectId = this.params.node.data.projectId;
      this.task.status = 'Completed';

      this.restService.editTask(this.task)
        .subscribe((response) => console.log(response),
          (error) => {
            console.log(error);
            throw error;
          });

      // this.params.context.componentParent.endTask();
    }

    refresh(): boolean {
        return false;
    }
}