import EmployeesContainer from "@/components/employeesContainer";
import { Suspense } from "react";

import React from "react";
import PageHeader from "@/components/ui/pageHeader";
import { GrUserWorker } from "react-icons/gr";

const EmployeePage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Funcionários" HeaderIcon={GrUserWorker} />
      <Suspense>
        <EmployeesContainer />
      </Suspense>
    </div>
  );
};

export default EmployeePage;
