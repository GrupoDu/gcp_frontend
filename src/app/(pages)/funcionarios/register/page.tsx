"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import EmployeeForm from "@/components/forms/employeeForm";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmployeePayload } from "@/types/employee.interface";
import { handlePost } from "@/utils/handleSubmitUtils/handlePost";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";

async function handleSubmit(
  e: React.SubmitEvent,
  payload: EmployeePayload,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void,
) {
  e.preventDefault();
  setIsLoading(true);

  const success = await handlePost(payload, "employee");

  if (!success) {
    setIsLoading(false);
    toast.error("Erro ao registrar usuário");
    return;
  }

  setIsLoading(false);
  toast.success("Usuário registrado com sucesso");
  router.push("/funcionarios");
}

const EmployeeRegisterPage = () => {
  const { isLoading, setIsLoading } = useLoading();
  const [newEmployee, setNewEmployee] = useState<EmployeePayload>({
    name: "",
    employeeRole: "",
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className={"pageContainer"}>
      <PageHeader headerTitle="Funcionários" HeaderIcon={FaUserCog} />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <Breadcrumb />
        <h3>Registrar novo usuário</h3>
        <EmployeeForm employee={newEmployee} setEmployee={setNewEmployee} handleSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default EmployeeRegisterPage;
