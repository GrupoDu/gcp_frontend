import { useContext } from "react";
import { AssistantsRegisterContext } from "@/context/assistantsRegisterContext";

export default function useAssistantsRegister() {
  const assistantsRegisters = useContext(AssistantsRegisterContext);

  if (!assistantsRegisters) throw new Error("Provider not provided.");

  return assistantsRegisters;
}
