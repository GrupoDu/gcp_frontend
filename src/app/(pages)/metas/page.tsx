"use client";

import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { LuGoal } from "react-icons/lu";
import Loading from "@/components/ui/loading";
import OpenMobileProvider from "@/providers/openMobile.provider";
import { useFetch } from "@/hooks/useFetch";
import { Goal } from "@/types/goal.interface";
import { useSearchParams } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import FiltersList from "@/components/filtersList";
import SearchBar from "@/components/searchBar";
import EmployeeDropdown from "@/components/employeeDropdown";
import StatusDropdown from "@/components/ui/statusDropdown";
import FilterMobileContainer from "@/components/filterMobileContainer";
import DeadlineInput from "@/components/ui/deadlineInput";
import GoalList from "@/components/cardLists/goalList";
import ListFooter from "@/components/listFooter";
import CardGoal from "@/components/ui/cardGoal";

const GoalPage = () => {
  const { data: goals, refetch } = useFetch<Goal[]>("goal");
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("title");
  const statusFilter = searchParams.get("status");
  const deadlineFilter = searchParams.get("deadline");
  const { isLoading } = useLoading();
  const filteredGoals = goals?.filter(
    (goal) =>
      (searchFilter ? goal.goalTitle.toLowerCase().includes(searchFilter.toLowerCase()) : true) &&
      (statusFilter ? goal.goalStatus === statusFilter : true) &&
      (deadlineFilter ? goal.goalDeadline.toString().includes(deadlineFilter) : true),
  );

  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Metas" HeaderIcon={LuGoal} />
      {isLoading && <Loading />}
      <main className={`${styles.goalListContainer} mainContainer ${isLoading && "loading"}`}>
        <h2>Lista da Metas</h2>
        <OpenMobileProvider>
          <FiltersList buttonLabel="Adicionar meta" hrefButton="/metas/register">
            <DeadlineInput />
            <SearchBar targetFilter={"title"} />
            <EmployeeDropdown />
            <StatusDropdown />
          </FiltersList>
          <FilterMobileContainer>
            <DeadlineInput />
            <SearchBar targetFilter={"title"} />
            <EmployeeDropdown />
            <StatusDropdown />
          </FilterMobileContainer>
          <ul className={styles.cardListContainer}>
            {goals?.map((goal) => (
              <li key={goal.goalUuid}>
                <CardGoal
                  goalId={goal.goalUuid || ""}
                  status={goal.goalStatus || ""}
                  refetch={refetch}
                  description={goal.goalDescription}
                  title={goal.goalTitle}
                  deadline={goal.goalDeadline.toString()}
                />
              </li>
            ))}
          </ul>
          <ListFooter status={["Em progresso", "Batida", "Não Alcançada"]} />
        </OpenMobileProvider>
      </main>
    </div>
  );
};

export default GoalPage;
