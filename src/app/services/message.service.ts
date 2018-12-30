import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserInfoModel } from '../model/userinfo.model';
import { SelectManagerDialogComponent } from '../dialogs/user/select-manager-dialog/select-manager-dialog.component';
import { ProjectInfoModel } from '../model/projectinfo.model';
import { SelectProjectDialogComponent } from '../dialogs/project/select-project-dialog/select-project-dialog.component';
import { ParentTaskInfoModel } from '../model/parenttaskinfo.model';
import { SelectParentTaskDialogComponent } from '../dialogs/parenttask/select-parent-task-dialog/select-parent-task-dialog.component';
import { ViewTaskInfoModel } from '../model/viewtask.model';
import { SelectUserDialogComponent } from '../dialogs/user/select-user-dialog/select-user-dialog.component';

@Injectable()
export class MessageService {
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
  ) { }

  confirm(title: string, message: string, options: string[]): Observable<string> {
    const initialState = {
      title: title,
      message: message,
      options: options,
      answer: "",
    };
    this.bsModalRef = this.bsModalService.show(ConfirmDialogComponent, { initialState });

    return new Observable<string>(this.getConfirmSubscriber());
  }

  selectManager(title: string, options: string[]): Observable<UserInfoModel> {
    const initialState = {
      title: title,
      options: options,
      managerDetail: UserInfoModel,
    };
    this.bsModalRef = this.bsModalService.show(SelectManagerDialogComponent, { initialState });

    return new Observable<UserInfoModel>(this.getSelectedManagerSubscriber());
  }

  private getSelectedManagerSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((managerDetail: UserInfoModel) => {
        observer.next(this.bsModalRef.content.managerDetail);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }


  selectUser(title: string, options: string[]): Observable<UserInfoModel> {
    const initialState = {
      title: title,
      options: options,
      userDetail: UserInfoModel,
    };
    this.bsModalRef = this.bsModalService.show(SelectUserDialogComponent, { initialState });

    return new Observable<UserInfoModel>(this.getSelectedUserSubscriber());
  }

  private getSelectedUserSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((userDetail: UserInfoModel) => {
        observer.next(this.bsModalRef.content.userDetail);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }


  editTask(): Observable<ViewTaskInfoModel> {
      
    return new Observable<ViewTaskInfoModel>(this.getEditTaskSubscriber());
  }

  private getEditTaskSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((editTaskInfo: ViewTaskInfoModel) => {
        observer.next(this.bsModalRef.content.editTaskInfo);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }


  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
        observer.next(this.bsModalRef.content.answer);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }


  //For Project Selection

  selectProject(title: string, options: string[]): Observable<ProjectInfoModel> {
    const initialState = {
      title: title,
      options: options,
      projectDetail: ProjectInfoModel,
    };
    this.bsModalRef = this.bsModalService.show(SelectProjectDialogComponent, { initialState });

    return new Observable<ProjectInfoModel>(this.getSelectedProjectSubscriber());
  }

  private getSelectedProjectSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((projectDetail: ProjectInfoModel) => {
        observer.next(this.bsModalRef.content.projectDetail);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }


  //For Parent Task Selection

  selectParentTask(title: string, options: string[]): Observable<ParentTaskInfoModel> {
    const initialState = {
      title: title,
      options: options,
      parentTaskDetail: ParentTaskInfoModel,
    };
    this.bsModalRef = this.bsModalService.show(SelectParentTaskDialogComponent, { initialState });

    return new Observable<ParentTaskInfoModel>(this.getSelectedParentTaskSubscriber());
  }

  private getSelectedParentTaskSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((parentTaskDetail: ParentTaskInfoModel) => {
        observer.next(this.bsModalRef.content.parentTaskDetail);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }


}
