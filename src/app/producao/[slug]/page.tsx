import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import "../../globals.scss";
import LinkButton from "@/components/linkButton";
import { IoIosArrowBack } from "react-icons/io";
import { CiSquareCheck } from "react-icons/ci";
import RegisterInfos from "@/components/registerInfos";
import ProductionRegisterSection from "@/components/productionRegisterSection";

async function ViewRegisterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Registro" />
      <main className="mainContainer">
        <div className={styles.buttons}>
          <LinkButton
            Icon={IoIosArrowBack}
            color="black"
            href={`/producao`}
            placeholder="Voltar"
          />
          <LinkButton
            Icon={CiSquareCheck}
            color="white"
            href={`/producao/edit/${slug}/edit`}
            placeholder="Marcar como concluído"
          />
        </div>
        <RegisterInfos register_id={slug} />
        <h3>
            <IoMdClipboard /> Registros de produção pendentes
        </h3>
        <ProductionRegisterSection />
      </main>
    </div>
  );
}

export default ViewRegisterPage;
