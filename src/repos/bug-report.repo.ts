import { Query } from "mongoose";

import { BaseRepo } from "./base.repo";
import { IBugReport, BugReportModel } from "../models/bug-report.model";
import { BugQueryParamsPayload } from "../payloads/bug-query-params.payload";
import { PageablePayload } from "../payloads/pageable.payload";

export class BugReportRepo extends BaseRepo<IBugReport> { 

    constructor() {
        super(BugReportModel);
    }

    async getSortedBugs(sortBy: string, sortType: string, 
                        size: number, 
                        page: number, 
                        bugQueryParamsPayload: BugQueryParamsPayload): Promise<PageablePayload<IBugReport>> {

        const filters = [
            bugQueryParamsPayload.title ? { title: { $regex: bugQueryParamsPayload.title, $options: "i" } } : null,
            bugQueryParamsPayload.priority ? { priority: bugQueryParamsPayload.priority } : null,
            bugQueryParamsPayload.reporter ? { reporter: bugQueryParamsPayload.reporter } : null,
            bugQueryParamsPayload.status ? { status: bugQueryParamsPayload.status } : null,
          ].filter(val => val !== null);


        const filterQuery = {
            $and: [...filters, {}]
        };

        const totalRecords = await this.retrieve().count(filterQuery);
        const totalPages = Math.ceil(totalRecords / size);

        const results = await this.entity
                            .find(filterQuery)
                            .sort({ [sortBy]: [sortType] })
                            .skip(size * page)
                            .limit(size).exec();
        
        const pageablePayload = new PageablePayload(page, size, totalPages, totalRecords, results);

        return pageablePayload;
        
    }
}