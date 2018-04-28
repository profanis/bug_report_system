import { Query } from "mongoose";

import { BaseRepo } from "./base.repo";
import { IBugReport, BugReportModel } from "../models/bug-report.model";

export class BugReportRepo extends BaseRepo<IBugReport> { 

    constructor() {
        super(BugReportModel);
    }

    getSortedBugs(sortBy: string, sortType: string, size: number, page: number): Query<IBugReport[]> {
        return this.entity
            .find({})
            .sort({ [sortBy]: [sortType] })
            .skip(size * page)
            .limit(size);
    }
}