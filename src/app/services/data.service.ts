import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ViewTaskInfoModel } from '../model/viewtask.model';

@Injectable()
export class DataService {

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
        userId:'',
        userRole:'',
        userStatus:'',
        employeeId:''
      }

  private messageSource = new BehaviorSubject('default message');
  private editTaskMessageSource = new BehaviorSubject(this.viewTask);

  private editTaskClickSource = new BehaviorSubject(false);

  currentMessage = this.messageSource.asObservable();
  currentEditTaskMessage = this.editTaskMessageSource.asObservable();
  currentEditTaskClickMessage = this.editTaskClickSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeEditTaskInfo(viewTaskInfo : ViewTaskInfoModel){
    this.editTaskMessageSource.next(viewTaskInfo);
  }

  changeEditTaskClickInfo(flag : boolean){
    this.editTaskClickSource.next(flag);
  }

}