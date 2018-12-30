import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserInfoModel } from 'src/app/model/userinfo.model';
import { RestServerService } from 'src/app/services/restserver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-manager-dialog',
  templateUrl: './select-manager-dialog.component.html',
  styleUrls: ['./select-manager-dialog.component.css'],
  providers: [RestServerService]
})
export class SelectManagerDialogComponent {

  title: string;
  options: string[];
  managerDetail: UserInfoModel;

  users: UserInfoModel[] = [];

  user: UserInfoModel = {
    firstName: '',
    lastName: '',
    employeeId: '',
    userId: '',
    projectId: '',
    taskId: '',
    role:'',
    status:''
  };

  listUser:boolean = false;
  filteredUserInfo = '';
  radioSelected : UserInfoModel;
  selectedUser = false;


  constructor(
    public bsModalRef: BsModalRef, private restService: RestServerService,
    private router: Router
  ) { 

    this.restService.getAvailableManagers()
      .subscribe((data: any[]) => {
        this.users = data;
        this.listUser = true;
      }
        ,
        (error) => {
          console.log(error);
          throw error;
        });

  }

  onSelectionChange(){
    this.selectedUser = true;
  }

  selectUser(){
    this.managerDetail = this.radioSelected;
    this.bsModalRef.hide();
  }
}
