export interface MaterialActivity {
  id_material_activity: number;
  name_material_activity: string;
  size_material_activity: number;
  link_material_activity: string;
  tipo_material_activity: string;
}

export interface IResponseActivityByUid {
  uid_activity: string;
  name_activity: string;
  content_activity: string;
  dt_entrega_activity: Date;
  isAcceptWithDelay_Activity: boolean;
  nota_max_activity: number;
  isEntregue_activity: boolean;
  createdAt_activity: Date | string;
  updatedAt_activity: Date | string;
  class_uid: string;
  category_activity_id: number;
  MaterialActivity: MaterialActivity[];
  category_activity: {
    tipo_category_activity: string;
  };
}
