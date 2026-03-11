import { useContext } from "react";
import { AssistantsPORegisterContext } from "@/context/assistantsPORegister.context";

export default function useAssistantsPORegister() {
  const assistantsPORegisters = useContext(AssistantsPORegisterContext);

  if (!assistantsPORegisters) throw new Error("Provider not provided.");

  return assistantsPORegisters;
}
