export class ViewTaskInfoModel {
    constructor(
        public projectId: string,
        public taskId: string,
        public userId : string,
        public parentId: string,
        public taskName: string, 
        public projectName: string,
        public userName: string,  
        public parentTaskName: string, 
        public priority: number, 
        public startDate: string,
        public endDate: string,
        public employeeId: string,
        public userStatus : string,
        public userRole: string
        ) {
    }
}