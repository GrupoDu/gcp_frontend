import { Employee } from "@/types/employee.interface";

export interface AssistantsActivities {
  uuid?: string;
  registeredAt: Date;
  producedQuantity: number;
  type: string;
  employee: Employee;
  activityDescription?: string;
}

export interface AssistantActivityPayload {
  uuid: string;
  activityDescription?: string | null;
  producedQuantity: number;
  type: string;
}

export interface CreateAssistantsActivities extends Omit<
  AssistantsActivities,
  "uuid" | "registeredAt"
> {}
