import { Nullable } from "../models/nullable";
import { BugReportRepo } from "../repos/bug-report.repo";
import { BugReportMapper } from "../mappers/bug-report.mapper";
import { BugReportPayload } from "../payloads/bug-report.payload";
import { BugQueryParamsPayload } from "../payloads/bug-query-params.payload";

export class BugReportService {

    private bugReportRepo: BugReportRepo;
    private bugReportMapper: BugReportMapper;

    constructor() {
        this.bugReportRepo = new BugReportRepo();
        this.bugReportMapper = new BugReportMapper();
    }

    public async retrieve(sortBy: string, sortType: string, size: number, page: number, bugQueryParamsPayload: BugQueryParamsPayload): Promise<BugReportPayload[]> {
        const data = await this.bugReportRepo.getSortedBugs(sortBy, sortType, size, page, bugQueryParamsPayload).exec();
        return Promise.resolve(data.map(this.bugReportMapper.toPayload));
    }

    public async findById(id: string): Promise<Nullable<BugReportPayload>> {
        const data = await this.bugReportRepo.findById(id).exec();
        if (data) {
            return Promise.resolve(this.bugReportMapper.toPayload(data));
        }

        return Promise.resolve(null);
    }

    public async findAllWithName(name: string): Promise<BugReportPayload[]> {
        const data = await this.bugReportRepo.find({ name }).exec();
        return Promise.resolve(data.map(this.bugReportMapper.toPayload));
    }

    

    public async create(payload: BugReportPayload): Promise<BugReportPayload> {
        const data = await this.bugReportRepo.create(this.bugReportMapper.toEntity(payload));
        return Promise.resolve(this.bugReportMapper.toPayload(data));
    }

    public async update(id: string, payload: BugReportPayload): Promise<BugReportPayload> {
        const data = await this.bugReportRepo.update(id, this.bugReportMapper.toEntity(payload)).exec();
        if (data) {
            return Promise.resolve(this.bugReportMapper.toPayload(data));
        }
        return Promise.reject(`Unable to find entity with id ${id}`);
    }

    public async delete(id: string): Promise<boolean> {
        const data = await this.bugReportRepo.delete(id).exec();

        // If no exception is thrown, the method will return true. Otherwise the exception will be handled by controller
        return Promise.resolve(true);
    }
}