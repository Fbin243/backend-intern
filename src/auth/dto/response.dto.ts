import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  message: string;
  data: any;
  statusCode: HttpStatus;

  constructor(message: string, statusCode: HttpStatus, data?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
