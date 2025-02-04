export class PaginationRequestDTO {
  page?: number = 1;
  limit?: number = 10;
  count?: boolean = true;
  ignorePage?: boolean = false;
}