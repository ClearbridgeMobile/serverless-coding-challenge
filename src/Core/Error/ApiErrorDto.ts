export interface ApiErrorDto {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Array<string>;

  [key: string]: any;
}
