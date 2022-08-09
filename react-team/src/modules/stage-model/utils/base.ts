import {ActionError} from '@elux/model';

export interface IRequest<Req, Res> {
  Request: Req;
  Response: Res;
}

export enum CommonErrorCode {
  unauthorized = 'unauthorized',
  forbidden = 'forbidden',
  notFound = 'notFound',
  unkown = 'unkown',
}

function mapHttpErrorCode(httpCode: string): CommonErrorCode {
  const HttpErrorCode = {
    401: CommonErrorCode.unauthorized,
    403: CommonErrorCode.forbidden,
    404: CommonErrorCode.notFound,
  };
  return HttpErrorCode[httpCode] || CommonErrorCode.unkown;
}

export class CustomError<Detail = any> implements ActionError {
  code: string;
  public constructor(code: string | number, public message: string, public detail?: Detail, public quiet?: boolean) {
    this.code = typeof code === 'number' ? mapHttpErrorCode[code] : code;
  }
}
