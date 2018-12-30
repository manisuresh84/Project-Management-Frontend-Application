import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorDataModel } from "../model/errordata.model";
import { LoggingService } from "../services/logging.service";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    constructor(private injector: Injector){}
    errorData : ErrorDataModel;
    private messageSource = new BehaviorSubject('Error Occurred!');
    currentMessage = this.messageSource.asObservable();

    changeMessage(message: string) {
        this.messageSource.next(message);
      }

    handleError(error: any){
        if(error instanceof ErrorDataModel){
            console.log("Handler Caught an error : " + error.message );
            let strMessage = "";
            strMessage = "Error Message [" + error.message + "] Http Status Code [" + error.status + "]";
            alert(strMessage);
        }else{
            console.warn('Handler caught an error', error);
            alert(error);
        }
        
    }

}