interface CategoryActivity {
  tipo_category_activity: string;
}

interface ClassUser {
  user: {
    name_user: string;
    tipo_user: string;
  };
}

interface Class {
  ClassUser: ClassUser[];
}

export interface IResponseAcitivities {
  uid_activity: string;
  name_activity: string;
  createdAt_activity: Date | string;
  category_activity: CategoryActivity;
  class: Class;
}
