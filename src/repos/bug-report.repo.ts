import { Query } from "mongoose";

import { BaseRepo } from "./base.repo";
import { IBugReport, BugReportModel } from "../models/bug-report.model";

export class BugReportRepo extends BaseRepo<IBugReport> { 

    constructor() {
        super(BugReportModel);
    }

    getSortedBugs(): Query<IBugReport[]> {
        return this.entity
            .find({})
            .sort({priority: 1})
    }
}