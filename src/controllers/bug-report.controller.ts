import { NextFunction, Request, Response, Router } from "express";

import { BugReportService } from "../services/bug-report.service";

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
                const data = await this.bugReportService.retrieve();
                res.send(data);
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