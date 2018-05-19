import { Query } from "mongoose";

import { BaseRepo } from "./base.repo";
import { IBugReport, BugReportModel } from "../models/bug-report.model";
import { BugQueryParamsPayload } from "../payloads/bug-query-params.payload";

export class BugReportRepo extends BaseRepo<IBugReport> { 

    constructor() {
        super(BugReportModel);
    }

    getSortedBugs(sortBy: string, sortType: string, size: number, page: number, bugQueryParamsPayload: BugQueryParamsPayload): Query<IBugReport[]> {
        const filters = [
            bugQueryParamsPayload.title ? { title: { $regex: bugQueryParamsPayload.title, $options: "i" } } : null,
            bugQueryParamsPayload.priority ? { priority: bugQueryParamsPayload.priority } : null,
            bugQueryParamsPayload.reporter ? { reporter: bugQueryParamsPayload.reporter } : null,
            bugQueryParamsPayload.status ? { status: bugQueryParamsPayload.status } : null,
          ].filter(val => val !== null);


        const filterQuery = {
            $and: [...filters, {}]
        };


        return this.entity
            .find(filterQuery)
            .sort({ [sortBy]: [sortType] })
            .skip(size * page)
            .limit(size);
    }
}