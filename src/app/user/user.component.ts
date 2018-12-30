import { Component, OnInit, Output, ViewChild, Input, OnDestroy } from '@angular/core';
import { UserInfoModel } from '../model/userinfo.model';
import { RestServerService } from '../services/restserver.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserTransactionComponent } from './user-transaction/user-transaction.component';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [RestServerService]
})
export class UserComponent implements OnInit, OnDestroy {

  private timerSubscription: AnonymousSubscription;

  @ViewChild('saveuser') saveUserForm: NgForm;
  @ViewChild('searchuser') searchUserForm: NgForm;
  @ViewChild(UserTransactionComponent) userTrans;
  defaultFirstName = 'Suresh Kumar';
  defaultLastName = 'Mani';
  defaultEmpId = '230853';

  showEdit: boolean = false;
  listUser: boolean = false;
  sortListUser: boolean = false;

  filteredUserInfo = '';

  user: UserInfoModel = {
    firstName: '',
    lastName: '',
    employeeId: '',
    userId: '',
    projectId: '',
    taskId: '',
    role: '',
    status: ''
  };

  submitted = false;

  users: UserInfoModel[] = [];
  // users: UserInfoModel[] = [
  //   {
  //     firstName: 'Suresh Kumar',
  //     lastName: 'Mani',
  //     employeeId:'230853'
  //   },
  //   {
  //     firstName: 'Sai Bairav',
  //     lastName: 'S.B',
  //     employeeId:'430853'
  //   },
  //   {
  //     firstName: 'Tim',
  //     lastName: 'Trick',
  //     employeeId:'44853'
  //   }
  // ];

  @Output() userData: UserInfoModel[] = this.users;
  constructor(private restService: RestServerService, private router: Router) {

  }


  ngOnInit() {
    this.refreshData();
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

  public ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  receiveMessage(userData) {
    this.user = userData;
    this.defaultEmpId = this.user.employeeId;
    this.defaultFirstName = this.user.firstName;
    this.defaultLastName = this.user.lastName;
  }

  receiveEditButton(editClicked) {
    this.showEdit = editClicked;
  }

  refreshUser(delUserRefresh) {
    // if(delUserRefresh === true){
    //   console.log('In refresh User after delete!!');
    //   this.restService.getUsers()
    //   .subscribe((data: any[]) => {
    //     this.users = data;
    //     this.listUser = true;
    //   }
    //     ,
    //     (error) => {
    //       console.log(error);
    //       throw error;
    //     });
    // }
  }

  onSubmit() {

    this.submitted = true;

    this.user.firstName = this.saveUserForm.value.firstName;
    this.user.lastName = this.saveUserForm.value.lastName;
    this.user.employeeId = this.saveUserForm.value.empId;
    this.user.role = "teammember";
    this.user.status = 'available';

    console.log(this.saveUserForm);
    this.restService.storeUser(this.user)
      .subscribe((response) => console.log(response),
        (error) => {
          console.log(error);
          throw error;
        });
    this.saveUserForm.reset();
    //this.router.navigateByUrl('/');
  }

  editUser() {
    this.user.firstName = this.saveUserForm.value.firstName;
    this.user.lastName = this.saveUserForm.value.lastName;
    this.user.employeeId = this.saveUserForm.value.empId;

    console.log(this.saveUserForm);
    this.restService.editUser(this.user)
      .subscribe((response) => console.log(response),
        (error) => {
          console.log(error);
          throw error;
        });
    this.saveUserForm.reset();

    this.ngOnInit();
    this.showEdit = false;
    //this.router.navigateByUrl('/');
  }

  sortUserByFirstName() {
    this.restService.getUsersByFirstNameAsc()
      .subscribe((data: any[]) => {
        this.users = data;
        this.sortListUser = true;
        this.listUser = false;
      }
        ,
        (error) => {
          console.log(error);
          throw error;
        });
  }

  sortUserByLastName() {
    this.restService.getUsersByLastNameAsc()
      .subscribe((data: any[]) => {
        this.users = data;
        this.sortListUser = true;
        this.listUser = false;
      }
        ,
        (error) => {
          console.log(error);
          throw error;
        });
  }

  sortUserByEmpId() {
    this.restService.getUsersByEmpIdAsc()
      .subscribe((data: any[]) => {
        this.users = data;
        this.sortListUser = true;
        this.listUser = false;
      }
        ,
        (error) => {
          console.log(error);
          throw error;
        });
  }

  focusOutFunction() {

  }

  private refreshData(): void {
    
    this.timerSubscription = this.restService.getUsers().subscribe(posts => {
      this.users = posts;
      this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    
    this.timerSubscription = Observable.timer(9000).first().subscribe(() => this.refreshData()
    );
  }
}
