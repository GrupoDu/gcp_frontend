"use client";

import styles from "./styles.module.scss";
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
import ListFooter from "@/components/listFooter";
import CardGoal from "@/components/ui/cardGoal";

const GoalsContainer = () => {
  const { data: goals, refetch } = useFetch<Goal[]>("goal");
  const searchParams = useSearchParams();
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loading />}
      <main className={`${styles.goalListContainer} mainContainer ${isLoading && "loading"}`}>
        <h2>Lista da Metas</h2>
        <OpenMobileProvider>
          <FiltersList buttonLabel="Adicionar meta" hrefButton="/metas/register">
            <SearchBar targetFilter={"title"} />
            <EmployeeDropdown />
            <StatusDropdown />
          </FiltersList>
          <FilterMobileContainer>
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
    </>
  );
};

export default GoalsContainer;
