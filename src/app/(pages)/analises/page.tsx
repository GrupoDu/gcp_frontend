<<<<<<< HEAD
// @ts-expect-error tipagem chata do ts
=======
>>>>>>> 738bf1c (AAAAAAAAAAAA:)
import "../../globals.scss";
import { FaGears } from "react-icons/fa6";
import PageHeader from "@/components/ui/pageHeader";
import AnalyticsContainer from "@/components/analyticsContainer";

const AnalysisPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Análises" HeaderIcon={FaGears} />
      <AnalyticsContainer />
    </div>
  );
};

export default AnalysisPage;
