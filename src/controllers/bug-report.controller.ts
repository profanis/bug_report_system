import { NextFunction, Request, Response, Router } from "express";

import { BugReportService } from "../services/bug-report.service";
import { BugQueryParamsPayload } from "../payloads/bug-query-params.payload";
import { BugReportPayload } from "../payloads/bug-report.payload";
import { PageablePayload } from "../payloads/pageable.payload";

export class BugReportController {
    public router: Router;
    private bugReportService: BugReportService;

    constructor() {
        this.bugReportService = new BugReportService();
        this.router = Router();
        
        this.get();
        this.getById();
        this.post();
        this.put();
        this.delete();
    }

    private get() {
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const DEFAULT_SORT_BY = "title";
                const DEFAULT_SORT_TYPE = "asc";
                const DEFAULT_PAGE = 0;
                const DEFAULT_PAGE_SIZE = 10;

                const { sort, page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE } = req.query;
                const [sortBy, sortType]  = sort ? sort.split(",") : [DEFAULT_SORT_BY, DEFAULT_SORT_TYPE]; 

                const bugQueryParamsPayload = new BugQueryParamsPayload();
                bugQueryParamsPayload.buildFromRequestQuery(req.query);

                const data: PageablePayload<BugReportPayload> = 
                        await this.bugReportService.retrieve(sortBy, sortType, Number(size), Number(page), bugQueryParamsPayload);
                res.header("page", data.page.toString())
                    .header("perPage", data.perPage.toString())
                    .header("totalPages", data.totalPages.toString())
                    .header("totalRecords", data.totalRecords.toString())
                    .send(data.results);
            } catch (error) {
                next(error);
            }
        });
    }

    private getById() {
        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await this.bugReportService.findById(req.params.id);
                if (data) {
                    return res.send(data);
                }
                return res.send({});            
            } catch (error) {
                return next(error);
            }
        });
    }

    private post() {
        this.router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await this.bugReportService.create(req.body);
                return res.send(data);
            } catch (error) {
                return next(error);
            }
        });
    }

    private put() {
        this.router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await this.bugReportService.update(req.params.id, req.body);
                return res.send(data);
            } catch (error) {
                return next(error);
            }
        });
    }

    private delete() {
        this.router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await this.bugReportService.delete(req.params.id);
                return res.send(data);
            } catch (error) {
                return next(error);
            }
        });
    }
}