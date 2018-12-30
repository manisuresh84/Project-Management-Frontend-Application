import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PopupModule } from 'ng2-popup';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { Ng5SliderModule } from 'ng5-slider';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatDialogModule, MatCardModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule } from "@angular/material";

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './project/task/task.component';
import { ViewtaskComponent } from './project/viewtask/viewtask.component';
import { OnlyNumber } from './validationdirective/onlynumbers.input';
import { UserTransactionComponent } from './user/user-transaction/user-transaction.component';
import { DateComponent } from './common/datefilter/date.component';
import { RestServerService } from './services/restserver.service';
import { LoggingService } from './services/logging.service';
import { FilterPipe } from './user/filter.pipe';
import { SelectmanagerComponent } from './user/selectmanager/selectmanager.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MessageService } from './services/message.service';
import { SelectManagerDialogComponent } from './dialogs/user/select-manager-dialog/select-manager-dialog.component';
import { SelectProjectDialogComponent } from './dialogs/project/select-project-dialog/select-project-dialog.component';
import { SelectParentTaskDialogComponent } from './dialogs/parenttask/select-parent-task-dialog/select-parent-task-dialog.component';
import { NgbDateFRParserFormatter } from './common/ngb-date-fr-parser-formatter';
import { EndtaskComponent } from './project/viewtask/childbuttons/endtask/endtask.component';
import { EdittaskComponent } from './project/viewtask/childbuttons/edittask/edittask.component';
import { ProjectTransactionComponent } from './project/task/project-transaction/project-transaction.component';
import { DataService } from './services/data.service';
import { DatePipe } from '@angular/common';
import { GlobalErrorHandler } from './errorhandle/globalerrorhandle.error';
import { GlobalErrorComponent } from './errorhandle/globalerror.component';
import { DefaultRequestOptions } from './services/defaultrequestoption';
import { SelectUserDialogComponent } from './dialogs/user/select-user-dialog/select-user-dialog.component';


const appRoute: Routes = [
  { path: 'project', component: ProjectComponent },
  { path: 'user', component: UserComponent },
  { path: 'task', component: TaskComponent },
  { path: 'viewtask', component: ViewtaskComponent },
  { path: 'error', component: GlobalErrorComponent }
];


export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent,
    ViewtaskComponent,
    TranslatePipe,
    OnlyNumber,
    UserTransactionComponent,
    DateComponent,
    FilterPipe,
    SelectmanagerComponent,
    ModalExampleComponent,
    ConfirmDialogComponent,
    SelectManagerDialogComponent,
    SelectProjectDialogComponent,
    SelectParentTaskDialogComponent,
    EdittaskComponent,
    EndtaskComponent,
    ProjectTransactionComponent,
    GlobalErrorComponent,
    SelectUserDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
    DlDateTimePickerDateModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2PopupModule,
    NgScrollbarModule,
    ModalModule.forRoot(),
    NgxBootstrapSliderModule,
    Ng5SliderModule,
    AlertModule.forRoot(),
    AgGridModule.withComponents([EdittaskComponent, EndtaskComponent])
  ],
  providers: [TranslateService, RestServerService, LoggingService,
    MessageService, NgbDateFRParserFormatter, DefaultRequestOptions,
    DataService, DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }],
  bootstrap: [AppComponent],
  entryComponents: [SelectmanagerComponent,
    ConfirmDialogComponent,
    SelectManagerDialogComponent,
    SelectProjectDialogComponent,
    SelectParentTaskDialogComponent,
    SelectUserDialogComponent]
})
export class AppModule { }
