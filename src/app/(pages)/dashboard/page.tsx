import PageHeader from "@/components/ui/pageHeader";
import { MdDashboard } from "react-icons/md";
<<<<<<< HEAD
// @ts-expect-error tipagem chata do ts
=======
>>>>>>> 738bf1c (AAAAAAAAAAAA:)
import "../../globals.scss";
import DashboardContainer from "@/components/dashboardContainer";
import { LoadingProvider } from "@/providers/loading.provider";

export default function DashboardPage() {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={MdDashboard} headerTitle="Dashboard" />
      <LoadingProvider>
        <DashboardContainer />
      </LoadingProvider>
    </div>
  );
}
