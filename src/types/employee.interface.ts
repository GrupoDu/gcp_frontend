export interface Employee {
  employeeUuid?: string;
  name: string;
  employeeRole: string;
  deliveredActivitiesQuantity?: number;
  notDeliveredActivitiesQuantity?: number;
  producedQuantity?: number;
}
