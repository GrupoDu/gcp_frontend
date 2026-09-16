export interface AssistantsRegisters {
  uuid?: string | null;
  delivered?: boolean;
  deliveredAt?: Date | null;
  productionOrderUuid?: string;
  assistantUuid: string;
  assistantAs: string;
}
