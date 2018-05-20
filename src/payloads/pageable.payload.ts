export class PageablePayload<T> {

  constructor (
    public page: number,
    public perPage: number,
    public totalPages: number,
    public totalRecords: number,
    public results: T[]
  ) {}
}