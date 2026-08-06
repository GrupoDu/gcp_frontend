import EmployeeAnalysisPageContainer from "@/components/employeeAnalysisPageContainer";
import { Suspense } from "react";

import { GrAnalytics } from "react-icons/gr";
import PageHeader from "@/components/ui/pageHeader";
import styles from "./page.module.scss";
import Loading from "@/components/ui/loading";

/**
 * Server Component for the individual employee analysis route.
 * Renders the page header and wraps the detailed analysis component in the EmployeeProvider.
 */
export default async function EmployeeAnalysisPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className={`pageContainer ${styles.slugPageContainer}`}>
      <PageHeader headerTitle="Análise de Funcionário" HeaderIcon={GrAnalytics} />
      <Suspense fallback={<Loading />}>
        <EmployeeAnalysisPageContainer />
      </Suspense>
    </div>
  );
}
