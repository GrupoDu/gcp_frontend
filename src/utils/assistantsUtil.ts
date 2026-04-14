import React from "react";
import { AssistantsPORegisters } from "@/types/assistantsPORegister.type";
import { debugLogger } from "@/utils/logger";

/**
 * Função que atualiza o estado do assistente
 *
 * @param e {React.ChangeEvent<HTMLSelectElement>} - event
 * @param {string} assistant_as - Função do assistente
 * @param {(value: React.SetStateAction<AssistantsPORegisters[]>) => void} setAssistantsRegisters - Função para atualizar o estado do assistente
 */
export function getAssistentValues(
  e: React.ChangeEvent<HTMLSelectElement>,
  assistant_as: string,
  setAssistantsRegisters: (value: React.SetStateAction<AssistantsPORegisters[]>) => void,
) {
  const isTargetValueEmpty = !e.target.value || e.target.value === "";
  if (isTargetValueEmpty) return;
  const value = e.target.value;

  setAssistantsRegisters((previousAssistants) => handleAssistantChange(previousAssistants, assistant_as, value));
}

/**
 * Verifica se o assistente já foi registrado
 *
 * @param {AssistantsPORegisters[]} assistants - Lista de assistentes
 * @param {string} assistant_as - Função do assistente
 */
function isAssistantRoleAlreadySet(assistants: AssistantsPORegisters[], assistant_as: string): boolean {
  return assistants.some((assistant) => assistant.assistant_as === assistant_as);
}

/**
 * Função que atualiza o estado do assistente
 *
 * @param {AssistantsPORegisters} previousAssistants - Valores antigos dos assistentes
 * @param {string} assistant_as - Função do assistente
 * @param {string} value - UUID do assistente
 */
function handleAssistantChange(previousAssistants: AssistantsPORegisters[], assistant_as: string, value: string) {
  const isRoleAlreadyRegistered = isAssistantRoleAlreadySet(previousAssistants, assistant_as);

  let updatedAssistants;

  if (isRoleAlreadyRegistered) {
    updatedAssistants = previousAssistants.map((registeredAssistant) =>
      registeredAssistant.assistant_as === assistant_as
        ? { ...registeredAssistant, assistant_uuid: value }
        : registeredAssistant,
    );
  } else {
    updatedAssistants = [...previousAssistants, { assistant_uuid: value, assistant_as }];
  }

  debugLogger(`
      ||> Atualizando setAssistantsRegister <|| 
      ${JSON.stringify(updatedAssistants)} 
      `);

  return updatedAssistants;
}
