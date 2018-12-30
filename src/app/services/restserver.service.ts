import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfoModel } from "../model/userinfo.model";

import { Observable } from "rxjs/Rx";
import { ProjectInfoModel } from "../model/projectinfo.model";
import { TaskInfoModel } from "../model/taskinfo.model";
import { ParentTaskInfoModel } from "../model/parenttaskinfo.model";

@Injectable()
export class RestServerService {
    constructor(private httpService: Http, private httpClientService: HttpClient) { }

    storeUser(user: UserInfoModel) {
        return this.httpService.
            post('http://localhost:9090/api/user',
                user);
    }

    storeProject(project: ProjectInfoModel) {
        return this.httpService.
            post('http://localhost:9090/api/project',
                project);
    }

    storeTask(task: TaskInfoModel) {
        return this.httpService.
            post('http://localhost:9090/api/task',
                task);
    }

    storeParentTask(parentTask: ParentTaskInfoModel) {
        return this.httpService.
            post('http://localhost:9090/api/ptask',
                parentTask);
    }


    editUser(user: UserInfoModel) {
        return this.httpService.
            put('http://localhost:9090/api/user',
                user);
    }

    editTask(task: TaskInfoModel) {
        return this.httpService.
            put('http://localhost:9090/api/task',
                task);
    }

    editProject(project: ProjectInfoModel) {
        return this.httpService.
            put('http://localhost:9090/api/project',
                project);
    }

    editParentTask(parentTask: ParentTaskInfoModel) {
        return this.httpService.
            put('http://localhost:9090/api/ptask',
            parentTask);
    }

    getUsers() {
        return this.httpService.get('http://localhost:9090/api/users')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getAvailableUsers(){
        return this.httpService.get('http://localhost:9090/api/users/available')
        .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
            }
        );
    }

    getAvailableManagers(){
        return this.httpService.get('http://localhost:9090/api/users/availablemgr')
        .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
            }
        );
    }

    getProjects() {
        return this.httpService.get('http://localhost:9090/api/projects')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getTasks() {
        return this.httpService.get('http://localhost:9090/api/tasks')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getParentTasks() {
        return this.httpService.get('http://localhost:9090/api/ptasks')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getProjectTasks(projectId: string) {
        console.log('Get Project Tasks Project Id :' + projectId);
        return this.httpService.get('http://localhost:9090/api/tasks/project/' + projectId)
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getViewProjectTasks(projectId: string) {
        
        return this.httpService.get('http://localhost:9090/api/tasks/view/project/' + projectId)
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getViewProjects() {
        
        return this.httpService.get('http://localhost:9090/api/projects/view')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong! - HTTP Status Code : ' + error.status);
                }
            );
    }


    getUser(userId: string) {
        return this.httpService.get('http://localhost:9090/api/user/' + userId);
    }

    getProject(projectId: string) {
        return this.httpService.get('http://localhost:9090/api/project/' + projectId);
    }

    getTask(taskId: string) {
        return this.httpService.get('http://localhost:9090/api/task/' + taskId);
    }

    getParentTask(parentTaskId: string) {
        return this.httpService.get('http://localhost:9090/api/ptask/' + parentTaskId);
    }

    getUsersByFirstNameAsc() {

        return this.httpService.get('http://localhost:9090/api/users/sort?orderBy=firstName&direction=ASC&page=0&size=10')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getProjectsByStartDateAsc() {

        return this.httpService.get('http://localhost:9090/api/projects/sort?orderBy=startDate&direction=ASC')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getProjectsByEndDateAsc() {

        return this.httpService.get('http://localhost:9090/api/projects/sort?orderBy=endDate&direction=ASC')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getProjectsByPriorityAsc() {

        return this.httpService.get('http://localhost:9090/api/projects/sort?orderBy=priority&direction=ASC')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getUsersByLastNameAsc() {

        return this.httpService.get('http://localhost:9090/api/users/sort?orderBy=lastName&direction=ASC&page=0&size=10')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    getUsersByEmpIdAsc() {

        return this.httpService.get('http://localhost:9090/api/users/sort?orderBy=employeeId&direction=ASC&page=0&size=10')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong!- HTTP Status Code : ' + error.status);
                }
            );
    }

    deleteUser(userId: string) {
        return this.httpService.delete('http://localhost:9090/api/user/' + userId);
    }

    deleteProject(projectId: string) {
        return this.httpService.delete('http://localhost:9090/api/project/' + projectId);
    }
    
    deleteTask(taskId: string) {
        return this.httpService.delete('http://localhost:9090/api/task/' + taskId);
    }

    deleteParentTask(parentTaskId: string) {
        return this.httpService.delete('http://localhost:9090/api/ptask/' + parentTaskId);
    }
}