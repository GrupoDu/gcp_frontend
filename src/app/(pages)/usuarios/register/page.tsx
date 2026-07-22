import PageHeader from "@/components/ui/pageHeader";
import "../../../globals.scss";
import { FaUserCog } from "react-icons/fa";
import UserForm from "@/components/forms/userForm";
import { UserProvider } from "@/providers/users.provider";
import { Breadcrumb } from "@/components/breadcrumb";

const RegisterUserPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <Breadcrumb />
        <h3>Registrar novo usuário</h3>
        <UserProvider>
          <UserForm />
        </UserProvider>
      </main>
    </div>
  );
};

export default RegisterUserPage;
