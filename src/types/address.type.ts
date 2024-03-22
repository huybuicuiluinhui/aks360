export interface IAddress {
  address_detail: string;
  created_at: string;
  district_id: number;
  district_name: string;
  full_address: string;
  id: number;
  is_default: string;
  province_id: number;
  province_name: string;
  updated_at: string;
  user_id: number;
  ward_id: number;
  ward_name: string;
}
export interface IProvince {
  CanUpdateCOD: string;
  Code: string;
  CountryID: string;
  IsEnable: string;
  NameExtension: string;
  PROVINCE_CODE_VTP: string;
  PROVINCE_ID_VTP: string;
  PROVINCE_NAME_VTP: string;
  ProvinceID: string;
  ProvinceName: string;
  RegionID: string;
  Status: string;
  UpdatedBy: string;
  created_at: string;
  id: number;
  updated_at: string;
}
export interface IDistrict {
  CanUpdateCOD: string;
  CreatedEmployee: string;
  CreatedIP: string;
  CreatedSource: string;
  DISTRICT_ID_VTP: string;
  DISTRICT_NAME_VTP: string;
  DISTRICT_VALUE_VTP: string;
  DistrictID: string;
  DistrictName: string;
  NameExtension: string;
  OnDates: string;
  PROVINCE_ID_VTP: string;
  ProvinceID: string;
  ReasonCode: string;
  ReasonMessage: string;
  Status: string;
  SupportType: string;
  Type: string;
  UpdatedEmployee: string;
  UpdatedIP: string;
  UpdatedSource: string;
  WhiteListClient: string;
  WhiteListDistrict: string;
  created_at: string;
  id: number;
  updated_at: string;
}
export interface IWard {
  CanUpdateCOD: string;
  DISTRICT_ID_VTP: string;
  DistrictID: string;
  IsEnable: string;
  NameExtension: string;
  ReasonCode: string;
  ReasonMessage: string;
  Status: string;
  SupportType: string;
  WARDS_ID_VTP: string;
  WARDS_NAME_VTP: string;
  WardCode: string;
  WardName: string;
  created_at: string;
  id: number;
  updated_at: string;
}
