import React, { Suspense } from "react";
import styles from "./page.module.scss";
import "../../globals.scss";
import EmployeeListContainer from "@/components/lists/employeeList";
import PageHeader from "@/components/ui/pageHeader";
import { GrUserWorker } from "react-icons/gr";
import OpenMobileProvider from "@/providers/openMobile.provider";
import Loading from "@/components/ui/loading";
import { Breadcrumb } from "@/components/breadcrumb";

const EmployeePage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Funcionários" HeaderIcon={GrUserWorker} />
      <OpenMobileProvider>
        <Suspense fallback={<Loading />}>
          <EmployeeListContainer />
        </Suspense>
      </OpenMobileProvider>
    </div>
  );
};

export default EmployeePage;
