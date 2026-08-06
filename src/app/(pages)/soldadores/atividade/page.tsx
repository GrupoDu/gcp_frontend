"use client";

import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { Breadcrumb } from "@/components/breadcrumb";
import styles from "./page.module.scss";
import { useState } from "react";
import { DefaultButton } from "@/components/ui/defaultButton";
import TextInput from "@/components/ui/textInput";
import SelectInput from "@/components/ui/selectInput";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";
import { Product } from "@/types/product.interface";
import { toast } from "react-toastify";
import { WelderActivityPayload } from "@/types/weldersActivities.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getOptions } from "@/utils/getOptions";
import Loading from "@/components/ui/loading";
import { useLoading } from "@/hooks/useLoading";
import { handlePost } from "@/utils/handleSubmitUtils/handlePost";

const handleSubmit = async (
  e: React.SubmitEvent,
  payload: WelderActivityPayload,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void,
) => {
  e.preventDefault();

  setIsLoading(true);

  const success = await handlePost(payload, "welderActivity/register");

  if (!success) return;

  toast.success("Atividade registrada com sucesso");
  router.push("/soldadores?page=1&pageSize=10");

  setIsLoading(false);
};

function WeldersActivityPage() {
  const [welder, setWelder] = useState("");
  const [producedQuantity, setProducedQuantity] = useState(0);
  const [textLimitCount, setTextLimitCount] = useState(50);
  const [description, setDescription] = useState("");
  const [isGeneralActivity, setIsGeneralActivity] = useState(false);
  const [producedProduct, setProducedProduct] = useState("");
  const { isLoading, setIsLoading } = useLoading();

  const router = useRouter();
  const { data: welders } = useFetch<Employee[]>("employee/filter?role=Soldador");
  const { data: products } = useFetch<Product[]>("product");

  const weldersOptions = welders?.map((welder) => getOptions(welder.employeeUuid, welder.name)) || [];
  const productsOptions = products?.map((product) => getOptions(product.productUuid, product.acronym)) || [];
  const handleTextLimitChange = (value: string) => {
    const fullLengthString = value.length;
    setTextLimitCount(50 - fullLengthString);
    setDescription(value);
  };

  const payload = {
    welderUuid: welder,
    productUuid: isGeneralActivity ? null : producedProduct,
    producedQuantity: producedQuantity,
    descriptionGeneralActivity: !isGeneralActivity ? null : description,
    isGeneralActivity: isGeneralActivity,
  };

  return (
    <>
      <div className="pageContainer">
        <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
        {isLoading && <Loading />}
        <main className={`mainContainer`}>
          <Breadcrumb />
          <h2>Registrar atividade</h2>
          <form className={"form"} onSubmit={(e) => handleSubmit(e, payload, router, setIsLoading)}>
            <SelectInput
              options={weldersOptions}
              value={welder}
              label={"Soldador"}
              required={true}
              defaultValue={"Selecione um soldador"}
              onChange={(e) => setWelder(e.target.value)}
            />
            <TextInput
              type={"number"}
              onChange={(e) => setProducedQuantity(parseInt(e.target.value, 10))}
              value={producedQuantity}
              required={true}
              min={1}
              label={"Quantidade produzida"}
            />
            <SelectInput
              options={productsOptions}
              onChange={(e) => setProducedProduct(e.target.value)}
              defaultValue={"Selecione o produto"}
              value={producedProduct}
              label={"Produto produzido"}
              isDisabled={isGeneralActivity}
            />
            <div className={styles.inputCheck}>
              <input
                type="checkbox"
                checked={isGeneralActivity}
                onChange={(e) => setIsGeneralActivity(e.target.checked)}
              />
              <span>Solda Geral</span>
            </div>
            <label className={`${styles.textareaContainer} ${isGeneralActivity && styles.isActive}`}>
              <span>Descição de atividade geral</span>
              <textarea
                onChange={(e) => handleTextLimitChange(e.target.value)}
                maxLength={50}
                placeholder={"Fechamento de caçamba"}
                disabled={!isGeneralActivity}
                className={"input"}
              ></textarea>
              <span className={styles.textLimitCount}>Caracteres restantes: {textLimitCount}</span>
            </label>
            <div className={styles.buttons}>
              <div className={styles.buttonWrapper}>
                <DefaultButton
                  type={"button"}
                  style={{ color: "white", backgroundColor: "black", border: "none" }}
                  onClick={() => router.back()}
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
    </>
  );
}

export default WeldersActivityPage;
