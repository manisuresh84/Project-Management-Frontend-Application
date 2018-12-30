import { Component, OnInit, ViewChild,TemplateRef, OnDestroy   } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserInfoModel } from '../model/userinfo.model';
import { SelectmanagerComponent } from '../user/selectmanager/selectmanager.component';
import { NgForm } from '@angular/forms';
import { ProjectInfoModel } from '../model/projectinfo.model';
import { Options } from 'ng5-slider';
import { RestServerService } from '../services/restserver.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { NgbDateFRParserFormatter } from '../common/ngb-date-fr-parser-formatter';
import { NgbDatepickerConfig, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { ViewProjectInfoModel } from '../model/viewproject.model';
import { DatePipe } from '@angular/common'
import { ErrorDataModel } from '../model/errordata.model';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers:[RestServerService, {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ProjectComponent implements OnInit, OnDestroy {

  value: number = 10;
  options: Options = {
    floor: 0,
    ceil: 30
  };

  errorFlag = false;
  dateFormatter =  new NgbDateFRParserFormatter();
  
  parseDate: NgbDateStruct;

  private timerSubscription: AnonymousSubscription;
  
  answers: string[] = [];
  userSelect= false;
  @ViewChild('saveproject') saveProjectForm: NgForm;
  isDate: false;
  message: string;
  defaultProjectTitle = "Fire Control System";
  defaultManager = "";
  planModel: any = { start_date: new Date(), end_date: new Date() };
  showDialog: boolean;
  modalRef: BsModalRef;

  datevalidationmessage : string;

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

  project: ProjectInfoModel = {
    projectId: '',
    projectName: '',
    startDate: '',
    endDate: '',
    priority: 0,
    status: ''
  };

  viewProject : ViewProjectInfoModel = {
    projectId: '',
    userId : '',
    userName: '',
    projectName: '', 
    priority: 0, 
    startDate: '',
    endDate: '',
    totalTaskCount: 0,
    totalCompletedTaskCount : 0,
    employeeId: '',
    userStatus:'',
    userRole:''
  }

  viewProjects: ViewProjectInfoModel[] = [];

  submitted = false;

  showEdit: boolean = false;
  listProject:boolean = false;
  sortListProject:boolean = false;
  employeeId = "";

  filteredProjectInfo = '';

  constructor(private modalService: BsModalService,
    private restService: RestServerService, private router: Router,
    private messageService: MessageService,
    public datepipe: DatePipe) {

  }

    ngOnInit() {
      this.refreshData();
      this.restService.getViewProjects()
      .subscribe((data: any[]) => {
        this.viewProjects = data;
        this.listProject = true;
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

  openSelectManagerDialog(){
    this.messageService.selectManager(
      "Select Project Manager",
      ["Select", "Cancel"])
      .subscribe((managerDetail) => {
        console.log(managerDetail);
        this.user = managerDetail;
        this.userSelect = true;
      });
  }

  closeModal() {

  }

  onSubmit() {

    this.submitted = true;

    this.project.projectName = this.saveProjectForm.value.projectTitle;
    if(typeof this.saveProjectForm.value.startdate != 'undefined'){
      this.project.startDate = this.saveProjectForm.value.startdate.year + "-" +
      this.saveProjectForm.value.startdate.month + "-" +
      this.saveProjectForm.value.startdate.day;
    }
    
    if(typeof this.saveProjectForm.value.enddate != 'undefined'){
      this.project.endDate = this.saveProjectForm.value.enddate.year + "-" +
      this.saveProjectForm.value.enddate.month + "-" +
      this.saveProjectForm.value.enddate.day;
    }

    this.project.priority = this.value;
    
    if(this.project.startDate != '' && this.project.endDate != ''){
      let newStartDate = new Date(this.project.startDate);
      let newEndDate = new Date(this.project.endDate);
      let currDate = new Date();
  
      if (newStartDate > newEndDate) {
        this.datevalidationmessage ='End Date should be greater than start date';
        
        let strMessage = "";
        strMessage = "Error Message [" + "End Date should be greater than start date" + "] Http Status Code [" + "402" + "]";
        this.saveProjectForm.reset();
        throw new Error(strMessage);
      }
 
      this.project.startDate  = this.datepipe.transform(this.project.startDate, 'yyyy-MM-dd');
      this.project.endDate  = this.datepipe.transform(this.project.endDate, 'yyyy-MM-dd');
    }
    
    this.project.status = 'Not Started';
    console.log(this.saveProjectForm);
    console.log(this.project);
    this.restService.storeProject(this.project)
      .subscribe((response) => {
        this.project = response.json();
        console.log(this.project);

        this.user.projectId = this.project.projectId;
        this.user.role = 'manager';
        this.user.status='unavailable';
        this.restService.editUser(this.user)
        .subscribe((response) => console.log(response),
        (error) => {
          console.log(error);
          throw error;
        });
      },
        (error) => {
          console.log(error);
          throw error;
        });
    this.saveProjectForm.reset();
    //this.router.navigateByUrl('/');
  }

  getProjectPriority() {
    this.project.priority = this.value;
  }

  sortProjectByStartDate(){
    this.restService.getProjectsByStartDateAsc()
    .subscribe((data: any[]) => {
      this.viewProjects = data;
      this.sortListProject = true;
      this.listProject = false;
    }
      ,
      (error) => {
        console.log(error);
        throw error;
      });
  }

  sortProjectByEndDate(){
    this.restService.getProjectsByEndDateAsc()
    .subscribe((data: any[]) => {
      this.viewProjects = data;
      this.sortListProject = true;
      this.listProject = false;
    }
      ,
      (error) => {
        console.log(error);
        throw error;
      });
	  
  }

  sortProjectByPriority(){
    console.log('In Sort Priority...');
    this.restService.getProjectsByPriorityAsc()
    .subscribe((data: any[]) => {
      this.viewProjects = data;
      console.log(this.viewProjects);
      this.sortListProject = true;
      this.listProject = false;
    }
      ,
      (error) => {
        console.log(error);
        throw error;
      });
	  
  }

  sortProjectByStatusCompleted(){

  }

  receiveMessage(projectData) {

    this.project.projectName = projectData.projectName;
    this.project.projectId = projectData.projectId;
    this.project.priority = projectData.priority;
    this.project.startDate = projectData.startDate;
    this.project.endDate = projectData.endDate;
    console.log(projectData);
    console.log(this.project);

    this.viewProject.employeeId = projectData.employeeId;
    this.viewProject.userName = projectData.userName;
    this.viewProject.userId = projectData.userId;
    this.viewProject.userStatus = projectData.userStatus;

    this.value = this.project.priority;
    this.defaultProjectTitle = this.project.projectName;
    this.defaultManager = projectData.userName;
    this.employeeId = projectData.employeeId;
    
  }

  receiveEditButton(editClicked){
    this.showEdit = editClicked;
  }
  
  editProject() {
    console.log(this.saveProjectForm);
    this.project.projectName = this.saveProjectForm.value.projectTitle;

    if(typeof this.saveProjectForm.value.startdate != 'undefined'){
      this.project.startDate = this.saveProjectForm.value.startdate.year + "-" +
      this.saveProjectForm.value.startdate.month + "-" +
      this.saveProjectForm.value.startdate.day;
    }
    
    if(typeof this.saveProjectForm.value.enddate != 'undefined'){
      this.project.endDate = this.saveProjectForm.value.enddate.year + "-" +
      this.saveProjectForm.value.enddate.month + "-" +
      this.saveProjectForm.value.enddate.day;
    }

    this.project.priority = this.value;
    
    if(this.project.startDate != '' && this.project.endDate != ''){
      let newStartDate = new Date(this.project.startDate);
      let newEndDate = new Date(this.project.endDate);
      let currDate = new Date();
  
      if (newStartDate > newEndDate) {
        this.datevalidationmessage ='End Date should be greater than start date';
        console.log('End Date should be greater than start date');
        this.errorFlag = true;
        let strMessage = "";
        strMessage = "Error Message [" + "End Date should be greater than start date" + "] Http Status Code [" + "402" + "]";
        this.saveProjectForm.reset();
        throw new Error(strMessage);
      }

      if(typeof this.project.startDate != 'undefined'){
        this.project.startDate  = this.datepipe.transform(this.project.startDate, 'yyyy-MM-dd');
      }

      if(typeof this.project.endDate != 'undefined'){
        this.project.endDate  = this.datepipe.transform(this.project.endDate, 'yyyy-MM-dd');
      }
      

    }
    
    console.log(this.saveProjectForm);
    console.log(this.project);
    this.restService.editProject(this.project)
      .subscribe((response) => {
        this.project = response.json();
        console.log(this.project);

        this.user.projectId = this.project.projectId;
        this.user.role = 'manager';
        this.user.status= this.viewProject.userStatus;
        
        if (typeof this.user.firstName === 'undefined' || typeof this.user.lastName === 'undefined') 
         {
          let toArrayUserName = this.viewProject.userName.split(",");
          this.user.firstName = toArrayUserName[0];
          this.user.lastName = toArrayUserName[1];
        } else if(this.user.firstName === ''){
          let toArrayUserName = this.viewProject.userName.split(",");
          this.user.firstName = toArrayUserName[0];
          this.user.lastName = toArrayUserName[1];
        }

        console.log('Emp Id [' + this.viewProject.employeeId + ']');
        this.user.employeeId = this.viewProject.employeeId;
        this.user.userId = this.viewProject.userId;

        console.log(this.user);

        this.restService.editUser(this.user)
        .subscribe((response) => console.log(response),
        (error) => {
          console.log(error);
          throw error;
        });
      },
        (error) => {
          console.log(error);
          throw error;
        });
    this.saveProjectForm.reset();
  }

  private refreshData(): void {
        
    this.timerSubscription = this.restService.getViewProjects().subscribe(posts => {
      this.viewProjects = posts;
      this.listProject = true;
      this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(9000).first().subscribe(() => this.refreshData()
    );
  }
}

