export interface Employee {
  employeeUuid: string;
  name: string;
  employeeRole: string;
  deliveredActivitiesQuantity?: number;
  notDeliveredActivitiesQuantity?: number;
  producedQuantity?: number;
}

type OmitPayload =
  | "employeeUuid"
  | "deliveredActivitiesQuantity"
  | "notDeliveredActivitiesQuantity"
  | "producedQuantity";

export interface EmployeePayload extends Omit<Employee, OmitPayload> {}
