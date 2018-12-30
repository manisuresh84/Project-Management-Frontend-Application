export class ViewProjectInfoModel {
    constructor(
        public projectId: string,
        public userId : string,
        public userName: string,
        public projectName: string, 
        public priority: number, 
        public startDate: string,
        public endDate: string,
        public totalTaskCount: number,
        public totalCompletedTaskCount : number,
        public employeeId: string,
        public userStatus : string,
        public userRole : string
        ) {
    }
}