declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    uid_user: string;
    ra_user: number;
    email_user: string;
    tipo_user: string;
    roles: any;
  }
}
