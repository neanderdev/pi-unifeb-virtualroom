declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    id_user: number;
    ra: number;
    email: string;
    tipo_user: string;
    role: any;
  }
}
