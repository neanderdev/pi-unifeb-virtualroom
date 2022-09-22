export interface ClassUser {
  user: {
    ra_user: number;
    name_user: string;
    email_user: string;
    tipo_user: string;
    avatar: string;
  };
}

export interface IResponseClassByUid {
  uid_class: string;
  name_class: string;
  name_matter_class: string;
  background_class: string;
  isArchive: boolean;
  createdAt_class: Date;
  updatedAt_class: Date;
  ClassUser: ClassUser[];
}
