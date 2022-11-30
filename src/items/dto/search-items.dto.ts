export class SearchItemsDto {
  title?: string;
  type?: string;
  limit?: number;
  take?: number;
  sort?: 'DESC' | 'ASC';
}