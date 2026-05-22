import { Employee } from "@/types/employee.type";

export interface AssistantsActivities {
  assistants_activities_uuid: string;
  registered_at: Date;
  produced_quantity: number;
  activity_type: string;
  assistants: Employee;
  activity_description?: string;
}

export interface CreateAssistantsActivities extends Omit<
  AssistantsActivities,
  "assistants_activities_uuid" | "registered_at"
> {}
