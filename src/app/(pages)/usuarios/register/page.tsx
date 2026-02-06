import PageHeader from "@/components/ui/pageHeader";
// @ts-expect-error tipagem chata do ts
import "../../globals.scss";
import styles from "./page.module.scss";
import { FaUserCog } from "react-icons/fa";
import RegisterUserForm from "@/components/forms/registerUserForm";

const RegisterUserPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <h3>Registrar novo usuário</h3>
        <RegisterUserForm />
      </main>
    </div>
  );
};

export default RegisterUserPage;
