import { Component, OnInit } from '@angular/core';
import { RestServerService } from 'src/app/services/restserver.service';
import { ParentTaskInfoModel } from 'src/app/model/parenttaskinfo.model';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-select-parent-task-dialog',
  templateUrl: './select-parent-task-dialog.component.html',
  styleUrls: ['./select-parent-task-dialog.component.css'],
  providers: [RestServerService]
})
export class SelectParentTaskDialogComponent {

  title: string;
  options: string[];
  parentTaskDetail: ParentTaskInfoModel;

  ptasks: ParentTaskInfoModel[] = [];

  ptask: ParentTaskInfoModel = {
    parentId: '',
    parentTaskName: ''
  };

  listParentTask:boolean = false;
  filteredParentTaskInfo = '';
  radioSelected : ParentTaskInfoModel;
  selectedParentTask = false;

  constructor(
    public bsModalRef: BsModalRef, private restService: RestServerService,
    private router: Router
  ) { 
    this.restService.getParentTasks()
      .subscribe((data: any[]) => {
        this.ptasks = data;
        this.listParentTask = true;
      }
        ,
        (error) => {
          console.log(error);
          throw error;
        });
  }

  ngOnInit() {
  }

  onSelectionChange(){
    this.selectedParentTask = true;
  }

  selectParentTask(){
    this.parentTaskDetail = this.radioSelected;
    console.log('In Dialog Return : ' + this.radioSelected);
    this.bsModalRef.hide();
  }

}
