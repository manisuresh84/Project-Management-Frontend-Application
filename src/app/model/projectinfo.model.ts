export class ProjectInfoModel {
    constructor(
        public projectId: string, 
        public projectName: string, 
        public startDate: string,
        public endDate: string, 
        public priority: number,
        public status: string
        ) {

    }
}