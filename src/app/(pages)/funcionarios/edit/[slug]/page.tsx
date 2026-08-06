"use client";

import PageHeader from "@/components/ui/pageHeader";
import { GrUserWorker } from "react-icons/gr";
import EmployeeForm from "@/components/forms/employeeForm";
import { useEffect, useState } from "react";
import { EmployeePayload } from "@/types/employee.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import { handlePatch } from "@/utils/handleSubmitUtils/handlePatch";

const handleSubmit = async (
  e: React.SubmitEvent,
  payload: EmployeePayload,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void,
) => {
  e.preventDefault();
  setIsLoading(true);

  const success = await handlePatch(payload, "employee/update");

  if (!success) {
    setIsLoading(false);
    toast.error("Ocorreu um erro ao editar Funcionário");
    return;
  }

  toast.success("Funcionário editado com sucesso");
  setIsLoading(false);
  router.push("funcionarios?page=1&pageSize=10");
};

const EmployeeEditPage = () => {
  const { slug } = useParams();
  const { data: fetchedEmployee } = useFetch<EmployeePayload>(`employee/${slug}`);
  const [employee, setEmployee] = useState<EmployeePayload>({
    name: "",
    employeeRole: "",
  });

  useEffect(() => {
    if (fetchedEmployee) setEmployee(fetchedEmployee);
  }, [fetchedEmployee]);

  return (
    <div className={"pageContainer"}>
      <PageHeader headerTitle="Usuários" HeaderIcon={GrUserWorker} />

      <main className="mainContainer">
        <h2>Editar dados de Funcionario</h2>
        <EmployeeForm setEmployee={setEmployee} employee={employee} handleSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default EmployeeEditPage;
