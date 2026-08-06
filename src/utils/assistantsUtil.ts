import React, { Dispatch, SetStateAction } from "react";
import { AssistantsRegisters } from "@/types/assistantsRegister.interface";
import { debugLogger } from "@/utils/logger";

/**
 * Função que atualiza o estado do assistente
 *
 * @param e {React.ChangeEvent<HTMLSelectElement>} - event
 * @param assistantAs
 * @param {(value: React.SetStateAction<AssistantsPORegisters[]>) => void} setAssistantsRegisters - Função para atualizar o estado do assistente
 */
export function getAssistentValues(
  e: React.ChangeEvent<HTMLSelectElement>,
  assistantAs: string,
  setAssistantsRegisters: Dispatch<SetStateAction<AssistantsRegisters[]>>,
) {
  const isTargetValueEmpty = !e.target.value || e.target.value === "";
  if (isTargetValueEmpty) return;
  const value = e.target.value;

  setAssistantsRegisters((previousAssistants) => handleAssistantChange(previousAssistants, assistantAs, value));
}

/**
 * Verifica se o assistente já foi registrado
 *
 * @param {AssistantsPORegisters[]} assistants - Lista de assistentes
 * @param assistantAs
 */
function isAssistantRoleAlreadySet(assistants: AssistantsRegisters[], assistantAs: string): boolean {
  return assistants.some((assistant) => assistant.assistantAs === assistantAs);
}

/**
 * Função que atualiza o estado do assistente
 *
 * @param {AssistantsPORegisters} previousAssistants - Valores antigos dos assistentes
 * @param assistantAs
 * @param {string} value - UUID do assistente
 */
function handleAssistantChange(previousAssistants: AssistantsRegisters[], assistantAs: string, value: string) {
  const isRoleAlreadyRegistered = isAssistantRoleAlreadySet(previousAssistants, assistantAs);

  let updatedAssistants;

  if (isRoleAlreadyRegistered) {
    updatedAssistants = previousAssistants.map((registeredAssistant) =>
      registeredAssistant.assistantAs === assistantAs
        ? { ...registeredAssistant, assistantUuid: value }
        : registeredAssistant,
    );
  } else {
    updatedAssistants = [...previousAssistants, { assistantUuid: value, assistantAs }];
  }

  debugLogger(`
      ||> Atualizando setAssistantsRegister <|| 
      ${JSON.stringify(updatedAssistants)} 
      `);

  return updatedAssistants;
}
