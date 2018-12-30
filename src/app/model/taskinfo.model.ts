export class TaskInfoModel {
    constructor(
        public taskId: string, 
        public taskName: string, 
        public startDate: string,
        public endDate: string, 
        public priority: number, 
        public status: string, 
        public parentId: string,
        public projectId: string
        ) {
    }
}