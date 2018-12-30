export class UserInfoModel {
    constructor(
        public firstName: string, 
        public lastName: string, 
        public employeeId: string, 
        public userId: string, 
        public projectId:string, 
        public taskId: string,
        public role: string,
        public status:string
        ) {
    }
}