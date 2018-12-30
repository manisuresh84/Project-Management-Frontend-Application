import { Component, OnInit } from '@angular/core';
import { RestServerService } from 'src/app/services/restserver.service';
import { ProjectInfoModel } from 'src/app/model/projectinfo.model';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-select-project-dialog',
  templateUrl: './select-project-dialog.component.html',
  styleUrls: ['./select-project-dialog.component.css'],
  providers: [RestServerService]
})
export class SelectProjectDialogComponent {

  title: string;
  options: string[];
  projectDetail: ProjectInfoModel;

  projects: ProjectInfoModel[] = [];

  project: ProjectInfoModel = {
    projectId: '',
    projectName: '',
    startDate: '',
    endDate: '',
    priority: 0,
    status: ''
  };

  listProject:boolean = false;
  filteredProjectInfo = '';
  radioSelected : ProjectInfoModel;
  selectedProject = false;

  constructor(
    public bsModalRef: BsModalRef, private restService: RestServerService,
    private router: Router
  ) { 

    this.restService.getProjects()
    .subscribe((data: any[]) => {
      this.projects = data;
      this.listProject = true;
    }
      ,
      (error) => {
        console.log(error);
        throw error;
      });

  }

  onSelectionChange(){
    this.selectedProject = true;
  }


  selectProject(){
    this.projectDetail = this.radioSelected;
    this.bsModalRef.hide();
  }

  ngOnInit() {
  }

}
