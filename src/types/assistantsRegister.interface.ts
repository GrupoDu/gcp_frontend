export interface AssistantsRegisters {
  assistantRegisterUuid?: string | null;
  delivered?: boolean;
  deliveredAt?: Date | null;
  productionOrderUuid?: string;
  assistantUuid: string;
  assistantAs: string;
}
