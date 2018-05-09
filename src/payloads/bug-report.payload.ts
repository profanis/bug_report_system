import { CommentPayload } from "./comments.payload";

export class BugReportPayload {
    
    constructor(public id: string,
                public title: string,
                public description: string,
                public priority: number,
                public reporter?: string,
                public status?: string,
                public updatedAt?: string,
                public createdAt?: string,
                public comments?: CommentPayload[]) {
    }
}