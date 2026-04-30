import { ProductionOrder } from "@/types/productionOrder.type";
import { EmployeesInfos } from "@/types/employeesInfos";

type AssistantsName = {
  cutAssistant: string;
  foldAssistant: string;
  finishingAssistant: string;
  paintAssistant: string;
};

export function getAssistantsNames(employees: EmployeesInfos, productionOrder?: ProductionOrder): AssistantsName {
  const cutAssistant = productionOrder?.cut_assistant ? `${employees.cutAssistant?.name}` : "Não definido.";
  const foldAssistant = productionOrder?.fold_assistant ? `${employees.foldAssistant?.name}` : "Não definido.";
  const finishingAssistant = productionOrder?.finishing_assistant
    ? `${employees.finishingAssistant?.name}`
    : "Não definido.";
  const paintAssistant = productionOrder?.paint_assistant ? `${employees.paintAssistant?.name}` : "Não definido.";
  return { cutAssistant, foldAssistant, finishingAssistant, paintAssistant };
}
