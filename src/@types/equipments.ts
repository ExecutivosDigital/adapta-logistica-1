export interface EquipmentsProps {
  id: number;
  name: string;
  tag: string;
  consumption: string;
  last: string;
  programmed: string;
  executed: string;
  priority?: boolean;
}

export interface EquipmentCipsProps {
  id: number;
  name: string;
}

export interface EquipmentSubsetsProps {
  id: number;
  name: string;
  cips: EquipmentCipsProps[];
}

export interface EquipmentSetProps {
  id: number;
  name: string;
  subsets: EquipmentSubsetsProps[];
}

export interface EquipmentSetsProps {
  sets: EquipmentSetProps[];
}

export interface EquipmentOsProps {
  id: number;
  eqp: string;
  service: string;
  worker: string;
  consumption: string;
  date: string;
  status: string;
  place: string;
  placeCode: string;
}
