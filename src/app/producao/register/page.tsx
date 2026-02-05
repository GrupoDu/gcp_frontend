import CreateRegisterForm from "@/components/forms/createRegisterForm";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { UserProvider } from "@/providers/users.provider";
import { ProductProvider } from "@/providers/products.provider";

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
