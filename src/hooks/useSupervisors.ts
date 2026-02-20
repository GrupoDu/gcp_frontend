import { SupervisorContext } from "@/context/supervisor.context";
import { useContext } from "react";

export function useSupervisor() {
    const supervisorData = useContext(SupervisorContext);

    if (supervisorData === undefined) {
        throw new Error("useSupervisor deve ser usado com um Provider.");
    }

    return supervisorData;
}