import { Employee } from "@/types/employee.interface";

export interface AssistantsActivities {
  assistantsActivitiesUuid: string;
  registeredAt: Date;
  producedQuantity: number;
  activityType: string;
  employee: Employee;
  activityDescription?: string;
}

export interface AssistantActivityPayload {
  assistantUuid: string;
  activityDescription?: string | null;
  producedQuantity: number;
  activityType: string;
}

export interface AssistantsActivitiesPagination {
  assistantsActivities: AssistantsActivities[];
  maxPages: number;
}

export interface CreateAssistantsActivities extends Omit<
  AssistantsActivities,
  "assistantsActivitiesUuid" | "registeredAt"
> {}
