export interface Branch {
  id?: string;
  name?: string;
  name_localized?: null;
  reference?: string;
  type?: number;
  latitude?: null;
  longitude?: null;
  phone?: null;
  opening_from?: string;
  opening_to?: string;
  inventory_end_of_day_time?: string;
  receipt_header?: null;
  receipt_footer?: null;
  settings?: null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  receives_online_orders?: boolean;
  accepts_reservations?: boolean;
  reservation_duration?: number;
  reservation_times?: ReservationTimes;
  address?: null;
  sections?: Section[];
}

export interface ReservationTimes {
  [key: string]: Array<string[]>;
}

export interface Section {
  id?: string;
  branch_id?: string;
  name?: string;
  name_localized?: null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  tables?: Table[];
}

export interface Table {
  id?: string;
  section_id?: string;
  name?: string;
  status?: number;
  seats?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  accepts_reservations?: boolean;
}

export type BranchesState = {
  branches: Branch[];
  loading: boolean;
};

export interface TableTempDisplay {
  id?: string;
  section_id?: string;
  name?: string;
  status?: number;
  seats?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  accepts_reservations?: boolean;
  section_name?: string;
  composite_name?: string;
}
