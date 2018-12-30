import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserInfoModel } from 'src/app/model/userinfo.model';
import { NgForm } from '@angular/forms';
import { RestServerService } from 'src/app/services/restserver.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs-compat/operator/delay';

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.css'],
  providers:[RestServerService]
})
export class UserTransactionComponent implements OnInit {

  @Input('value') value: UserInfoModel;
  @ViewChild('usertransaction') userTransForm: NgForm;

  @Output() userEvent = new EventEmitter<UserInfoModel>();

  @Output() editButtonEvent = new EventEmitter<boolean>();
  @Output() refreshUsers = new EventEmitter<boolean>();
  
   
  user: UserInfoModel = {
    firstName: '',
    lastName: '',
    employeeId: '',
    userId:'',
    projectId:'',
    taskId:'',
    role:'',
    status:''
  };

  sendMessage() {
   
  }

  constructor(private restService: RestServerService, private router: Router) { }

  ngOnInit() {
  }

  onEditUser(){
    this.user.firstName = this.value.firstName;
    this.user.lastName = this.value.lastName;
    this.user.employeeId = this.value.employeeId;
    this.user.userId = this.value.userId;
    this.user.projectId = this.value.projectId;
    this.user.taskId = this.value.taskId;
    
    console.log(this.user);
    this.userEvent.emit(this.user);
    this.editButtonEvent.emit(true);
  }

  onDeleteUser(){
    this.user.userId = this.value.userId;
    this.restService.deleteUser(this.user.userId)
    .subscribe((response) => console.log(response),
      (error) => {
        console.log(error);
        throw error;
      });
      this.refreshUsers.emit(true);
        
      //this.router.navigateByUrl('/');
  }
}
