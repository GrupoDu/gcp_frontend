import { GrAnalytics } from "react-icons/gr";
import PageHeader from "@/components/ui/pageHeader";
import EmployeeAnalysisDetail from "@/components/employeeAnalysisDetail";
import styles from "./page.module.scss";
import { LoadingProvider } from "@/providers/loading.provider";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Server Component for the individual employee analysis route.
 * Renders the page header and wraps the detailed analysis component in the EmployeeProvider.
 *
 * @param {PageProps} props The component props containing route parameters.
 * @returns {Promise<React.JSX.Element>} The page element.
 */
export default async function EmployeeAnalysisPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className={`pageContainer ${styles.slugPageContainer}`}>
      <PageHeader headerTitle="Análise de Funcionário" HeaderIcon={GrAnalytics} />
      <LoadingProvider>
        <EmployeeAnalysisDetail employeeUuid={slug} />
      </LoadingProvider>
    </div>
  );
}
