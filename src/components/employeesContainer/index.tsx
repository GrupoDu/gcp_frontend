"use client";

import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "next/navigation";
import { Employee } from "@/types/employee.interface";
import ListItem from "@/components/userListItem";
import { TableList } from "@/components/lists/tableList";
import { EMPLOYEE_TABLE_HEADS } from "@/constants/tableHeads.constant";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/modal";

const EmployeesContainer = () => {
  const searchParams = useSearchParams();
  const hasFilters = searchParams.size > 0;
  const endpoint = `employee${hasFilters ? `/filter?${searchParams.toString()}` : "/active"}`;
  const { showModal, setShowModal } = useModal();
  const { data: employees, refetch } = useFetch<Employee[]>(endpoint);
  const isListPopulated = !!employees && employees.length > 0;

  const handleDeactivateEmployee = async (employeeUuid: string) => {
    try {
      await api.put(`employee/deactivate/${employeeUuid}`);

      toast.success("Funcionário desativado com sucesso.");
      refetch();
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setShowModal(false);
    }
  };

  const displayList = employees?.map((employee) => (
    <>
      <Modal action={() => handleDeactivateEmployee(employee.uuid)} />
      <ListItem key={employee.uuid} deleteButtonEndpoint="employees" refetch={refetch} data={employee} />
    </>
  ));

  return (
    <TableList tHeadValues={EMPLOYEE_TABLE_HEADS} isListPopulated={isListPopulated}>
      {displayList}
    </TableList>
  );
};

export default EmployeesContainer;
