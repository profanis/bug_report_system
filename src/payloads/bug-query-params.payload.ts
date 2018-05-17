export class BugQueryParamsPayload {

    constructor() {}

    public title: string;
    public priority: number;
    public reporter: string;
    public status: string;

    public buildFromRequestQuery(query: any) {
        const { title, priority, reporter, status } = query;

        this.title = title;
        this.priority = priority;
        this.reporter = reporter;
        this.status = status;
    }
}