export type AssistantsPORegisters = {
  assistants_po_registers_uuid?: string | null;
  delivered?: boolean;
  delivered_at?: Date | null;
  production_order_uuid?: string;
  assistant_uuid: string;
  assistant_as: string;
};
