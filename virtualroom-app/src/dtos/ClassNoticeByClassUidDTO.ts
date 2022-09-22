interface User {
  name_user: string;
  avatar: string;
}

export interface ClassNoticeAnswer {
  id_class_notice_answer: number;
  message: string;
  createdAt_class_notice_answer: Date | string;
  user_uid: string;
  class_notice_id: number;
  user: User;
}

export interface IResponseClassNotice {
  id_class_notice: number;
  message: string;
  createdAt_class_notice: Date | string;
  user_uid: string;
  class_uid: string;
  ClassNoticeAnswer: ClassNoticeAnswer[];
  user: User;
}
