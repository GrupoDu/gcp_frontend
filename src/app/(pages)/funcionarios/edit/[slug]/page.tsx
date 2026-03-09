import styles from "./page.module.scss";
import "../../../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { GrUserWorker } from "react-icons/gr";
import EmployeeForm from "@/components/forms/employeeForm";
import { EmployeeProvider } from "@/providers/employee.provider";

const EmployeeEditPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={GrUserWorker} />

      <main className="mainContainer">
        <h2>Editar dados de Funcionario</h2>
        <EmployeeProvider>
          <EmployeeForm isEdit={true} employee_id={slug} />
        </EmployeeProvider>
      </main>
    </div>
  );
};

export default EmployeeEditPage;
