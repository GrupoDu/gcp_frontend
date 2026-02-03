import styles from "./page.module.scss";
import "../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import FiltersList from "@/components/filtersList";
import FilterDropdown from "@/components/ui/filterDropdown";
import { LuPackageSearch } from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";
import { TbClipboardSearch } from "react-icons/tb";
import RegisterList from "@/components/cardLists/registerList";
import ListFooter from "@/components/listFooter";

const ProductionPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <main className="mainContainer">
        <h2>Registros de produção</h2>
        <div className={styles.listContainer}>
          <FiltersList
            produto={
              <FilterDropdown
                Icon={LuPackageSearch}
                label="Produto"
                placeholder="Escolher produto"
              />
            }
            funcionario={
              <FilterDropdown
                Icon={GrUserWorker}
                label="Funcionario"
                placeholder="Funcionário responsável"
              />
            }
            estado={
              <FilterDropdown
                Icon={TbClipboardSearch}
                label="Estado do registro"
                placeholder="Todos os registros"
              />
            }
            buttonPlaceholder="Novo registro"
          />
          <RegisterList />
          <ListFooter status={["Pendente", "Entregue", "Não entregue"]} />
        </div>
      </main>
    </div>
  );
};

export default ProductionPage;
