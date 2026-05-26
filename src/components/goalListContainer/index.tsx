"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import SearchBar from "../searchBar";
import EmployeeDropdown from "../employeeDropdown";
import StatusDropdown from "../ui/statusDropdown";
import GoalList from "../cardLists/goalList";
import ListFooter from "../listFooter";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";
import { useFetch } from "@/hooks/useFetch";
import { Goal } from "@/types/goal.type";
import { useSearchParams } from "next/navigation";
import OpenMobileProvider from "@/providers/openMobile.provider";

const GoalListContainer = () => {
  const { data: goals, refetch } = useFetch<Goal[]>("goals");
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("title");
  const statusFilter = searchParams.get("status");
  const deadlineFilter = searchParams.get("deadline");
  const { isLoading } = useLoading();
  const filteredGoals = goals?.filter(
    (goal) =>
      (searchFilter ? goal.goal_title.toLowerCase().includes(searchFilter.toLowerCase()) : true) &&
      (statusFilter ? goal.goal_status === statusFilter : true) &&
      (deadlineFilter ? goal.goal_deadline.toString().includes(deadlineFilter) : true),
  );

  return (
    <>
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
          <GoalList refetch={refetch} goalData={filteredGoals} />
          <ListFooter status={["Batida", "Pendente", "Não batida"]} />
        </OpenMobileProvider>
      </main>
    </>
  );
};

export default GoalListContainer;
