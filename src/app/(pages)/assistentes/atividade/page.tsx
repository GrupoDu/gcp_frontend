"use client";

import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { Breadcrumb } from "@/components/breadcrumb";
import { getOptions } from "@/utils/getOptions";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";
import SelectInput from "@/components/ui/selectInput";
import TextInput from "@/components/ui/textInput";
import { assistantActivityOptions } from "@/Constants/assistantActivityOptions.constant";
import styles from "./page.module.scss";
import { DefaultButton } from "@/components/ui/defaultButton";
import { toast } from "react-toastify";
import { AssistantActivityPayload } from "@/types/assistantsActivities.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { handlePost } from "@/utils/handleSubmitUtils/handlePost";
import { useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";

const handleSubmit = async (
  e: React.SubmitEvent,
  payload: AssistantActivityPayload,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void,
) => {
  e.preventDefault();
  setIsLoading(true);

  const success = await handlePost(payload, "assistantActivity");

  if (!success) {
    setIsLoading(false);
    toast.error("Ocorreu um erro durante registro");
    return;
  }

  toast.success("Atividade registrada com sucesso!");
  setIsLoading(false);
  router.push("/assistentes?page=1&pageSize=10");
};

function AssistantActivityPage() {
  const { setIsLoading, isLoading } = useLoading();
  const [assistant, setAssistant] = useState("");
  const [producedQuantity, setProducedQuantity] = useState(0);
  const [activityType, setActivityType] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const { data: assistants } = useFetch<Employee[]>("employee/filter?role=Assistente");

  const assistantsOptions = assistants?.map((assistant) => getOptions(assistant.employeeUuid, assistant.name));
  const payload: AssistantActivityPayload = {
    assistantUuid: assistant,
    activityDescription: description || null,
    producedQuantity: producedQuantity,
    activityType: activityType,
  };

  return (
    <div className={"pageContainer"}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle={"Atividades de Assistentes"} />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading && "loading"}`}>
        <Breadcrumb />
        <h2>Registrar Atividade</h2>
        <form className={"form"} onSubmit={(e) => handleSubmit(e, payload, router, setIsLoading)}>
          <SelectInput
            options={assistantsOptions}
            value={assistant}
            label={"Assistente"}
            required={true}
            defaultValue={"Selecione um assistente"}
            onChange={(e) => setAssistant(e.target.value)}
          />
          <TextInput
            type={"number"}
            onChange={(e) => setProducedQuantity(parseInt(e.target.value, 10))}
            value={producedQuantity}
            required={true}
            min={0}
            label={"Quantidade produzida"}
          />
          <SelectInput
            options={assistantActivityOptions}
            onChange={(e) => setActivityType(e.target.value)}
            defaultValue={"Selecione a atividade"}
            value={activityType}
            label={"Atividade realizada"}
          />
          <label className={`${styles.textareaContainer}`}>
            <span>Descição de atividade geral</span>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              maxLength={50}
              placeholder={"Fechamento de caçamba"}
              className={"input"}
            ></textarea>
          </label>
          <div className={styles.buttons}>
            <div className={styles.buttonWrapper}>
              <DefaultButton
                type={"button"}
                style={{ color: "white", backgroundColor: "black", border: "none" }}
                onClick={() => {
                  setIsLoading(true);
                  router.back();
                }}
              >
                Voltar
              </DefaultButton>
            </div>
            <div className={styles.buttonWrapper}>
              <DefaultButton type={"submit"}>Registrar</DefaultButton>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AssistantActivityPage;
