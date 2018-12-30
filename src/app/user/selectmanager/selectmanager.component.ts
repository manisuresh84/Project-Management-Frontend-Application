import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInfoModel } from '../../model/userinfo.model';
import { RestServerService } from '../../services/restserver.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-selectmanager',
  templateUrl: './selectmanager.component.html',
  styleUrls: ['./selectmanager.component.css'],
  providers: [RestServerService]
})
export class SelectmanagerComponent implements OnInit {

  @Output() selectedManager = new EventEmitter<UserInfoModel>();

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

  constructor(private modalRef: BsModalRef, private restService: RestServerService, 
    private router: Router) { }

  ngOnInit() {
    this.restService.getUsers()
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

  cancelWindow(){
    console.log('In Cancel Window');
  }

  selectUser(){
    console.log(this.radioSelected);
    this.selectedManager.emit(this.radioSelected);
    console.log('In Dialog Selected Manager Emit!');
    this.modalRef.hide();
  }

}
