import RegisterForm from "@/components/forms/registerForm";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { UserProvider } from "@/providers/users.provider";
import { ProductProvider } from "@/providers/products.provider";
import { EmployeeProvider } from "@/providers/employee.provider";

const RegisterPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Novo registro" />
      <main className="mainContainer">
        <h2>Criar novo registro de produção</h2>
        <UserProvider>
          <ProductProvider>
            <EmployeeProvider>
              <RegisterForm isEditPage={false} />
            </EmployeeProvider>
          </ProductProvider>
        </UserProvider>
      </main>
    </div>
  );
};

export default RegisterPage;
