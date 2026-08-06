"use client";

import EmployeeAnalysisDetail from "@/components/employeeAnalysisDetail";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import { EmployeeAnalysisProvider } from "@/providers/employeeAnalysis.provider";
import { useParams, useSearchParams } from "next/navigation";

/**
 * Server Component for the individual employee analysis route.
 * Renders the page header and wraps the detailed analysis component in the EmployeeProvider.
 */
export default function EmployeeAnalysisPageContainer() {
  const { isLoading } = useLoading();
  const { slug: employeeUuid } = useParams();
  const params = useSearchParams();
  const role = params.get("role");

  return (
    <>
      {isLoading && <Loading />}
      <EmployeeAnalysisProvider employeeUuid={String(employeeUuid)} employeeRole={String(role)}>
        <EmployeeAnalysisDetail />
      </EmployeeAnalysisProvider>
    </>
  );
}
