export interface Employee {
  uuid: string;
  name: string;
  role: string;
  deliveredActivitiesQuantity?: number;
  notDeliveredActivitiesQuantity?: number;
  producedQuantity?: number;
}

type OmitPayload =
  | "uuid"
  | "deliveredActivitiesQuantity"
  | "notDeliveredActivitiesQuantity"
  | "producedQuantity";

export interface EmployeePayload extends Omit<Employee, OmitPayload> {}
