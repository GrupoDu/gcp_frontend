"use client";

import { GrAnalytics } from "react-icons/gr";
import PageHeader from "@/components/ui/pageHeader";
import EmployeeAnalysisDetail from "@/components/employeeAnalysisDetail";
import styles from "./page.module.scss";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import { EmployeeAnalysisProvider } from "@/providers/employeeAnalysis.provider";
import { useParams, useSearchParams } from "next/navigation";

/**
 * Server Component for the individual employee analysis route.
 * Renders the page header and wraps the detailed analysis component in the EmployeeProvider.
 *
 * @param {PageProps} props The component props containing route parameters.
 * @returns {Promise<React.JSX.Element>} The page element.
 */
export default function EmployeeAnalysisPage() {
  const { isLoading } = useLoading();
  const { slug: employeeUuid } = useParams();
  const params = useSearchParams();
  const role = params.get("role");

  return (
    <div className={`pageContainer ${styles.slugPageContainer}`}>
      <PageHeader headerTitle="Análise de Funcionário" HeaderIcon={GrAnalytics} />
      {isLoading && <Loading />}
      <EmployeeAnalysisProvider employeeUuid={String(employeeUuid)} employeeRole={String(role)}>
        <EmployeeAnalysisDetail />
      </EmployeeAnalysisProvider>
    </div>
  );
}
