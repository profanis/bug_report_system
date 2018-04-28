import { Mapper } from "./interface-mapper";
import { IBugReport } from "../models/bug-report.model";
import { BugReportPayload } from "../payloads/bug-report.payload";

export class BugReportMapper implements Mapper<IBugReport, BugReportPayload> {
    
    toPayload(entity: IBugReport): BugReportPayload {
        return new BugReportPayload(entity.id, 
                                    entity.title,
                                    entity.description, 
                                    entity.priority, 
                                    entity.reporter, 
                                    entity.status, 
                                    entity.updatedAt, 
                                    entity.createdAt);
    }

    toEntity(payload: BugReportPayload): IBugReport {
        const { id, title, description, priority, reporter, status } = payload;
        return { id, title, description, priority, reporter, status };
    }
}