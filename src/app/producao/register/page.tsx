import CreateRegisterForm from "@/components/forms/createRegisterForm";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { UserProvider } from "@/app/providers/usersProvider";
import { ProductProvider } from "@/app/providers/productsProvider";

const RegisterPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Novo registro" />
      <main className="mainContainer">
        <h2>Criar novo registro de produção</h2>
        <UserProvider>
          <ProductProvider>
            <CreateRegisterForm />
          </ProductProvider>
        </UserProvider>
      </main>
    </div>
  );
};

export default RegisterPage;
