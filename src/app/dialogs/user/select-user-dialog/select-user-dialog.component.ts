import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserInfoModel } from 'src/app/model/userinfo.model';
import { RestServerService } from 'src/app/services/restserver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-user-dialog',
  templateUrl: './select-user-dialog.component.html',
  styleUrls: ['./select-user-dialog.component.css'],
  providers: [RestServerService]
})
export class SelectUserDialogComponent {

  title: string;
  options: string[];
  userDetail: UserInfoModel;

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

    this.restService.getAvailableUsers()
      .subscribe((data: any[]) => {
        this.users = data;
        console.log(this.users);
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
    this.userDetail = this.radioSelected;
    this.bsModalRef.hide();
  }
}
