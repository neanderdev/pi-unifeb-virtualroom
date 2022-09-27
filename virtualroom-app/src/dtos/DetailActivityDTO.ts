export interface MaterialDetailActivity {
  id_material_detail_activity: number;
  link_material_detail_activity: string;
  detail_activity_id: number;
  name_material_detail_activity: string;
  size_material_detail_activity: number;
}

export interface IResponseDetailActivityByUserUid {
  id_detail_activity: number;
  dt_isEntrega_detail_acitivity: Date | string;
  nota_user: number;
  MaterialDetailActivity: MaterialDetailActivity[];
}
