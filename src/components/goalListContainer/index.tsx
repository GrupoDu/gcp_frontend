"use client";

import styles from "./styles.module.scss";
import { useGoal } from "@/hooks/useGoal";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../searchBar";
import EmployeeDropdown from "../employeeDropdown";
import { EmployeeProvider } from "@/providers/employee.provider";
import StatusDropdown from "../ui/statusDropdown";
import GoalList from "../cardLists/goalList";
import ListFooter from "../listFooter";
import { useRouter } from "next/navigation";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";

const GoalListContainer = () => {
  const { goalsData, refetch } = useGoal();
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [deadlineFilterValue, setDeadlineFilterValue] = useState("");
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const { isLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    router.push(
      `/metas?search=${searchValue}&status=${statusValue}&deadline=${deadlineFilterValue}`,
    );
  }, [searchValue, statusValue, deadlineFilterValue, router]);

  const filteredGoals = useMemo(
    () =>
      goalsData?.filter(
        (goal) =>
          (searchValue
            ? goal.goal_title.toLowerCase().includes(searchValue.toLowerCase())
            : true) &&
          (statusValue ? goal.goal_status === statusValue : true) &&
          (deadlineFilterValue
            ? goal.goal_deadline.toString().includes(deadlineFilterValue)
            : true),
      ),
    [goalsData, searchValue, statusValue, deadlineFilterValue],
  );

  return (
    <>
      {isLoading && <Loading />}
      <main
        className={`${styles.goalListContainer} mainContainer ${isLoading && "loading"}`}
      >
        <h2>Lista da Metas</h2>
        <FiltersList
          openFilterContainer={openFilterContainer}
          openMobileFilters={setOpenFilterContainer}
          buttonLabel="Adicionar meta"
          hrefButton="/metas/register"
        >
          <DeadlineInput
            deadlineValue={deadlineFilterValue}
            setDeadlineValue={setDeadlineFilterValue}
          />
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <EmployeeProvider>
            <EmployeeDropdown
              setEmployeeValue={setStatusValue}
              employeeValue={statusValue}
            />
          </EmployeeProvider>
          <StatusDropdown
            setStatusValue={setStatusValue}
            statusValue={statusValue}
          ></StatusDropdown>
        </FiltersList>
        <FilterMobileContainer isFilterContainerOpen={openFilterContainer}>
          <DeadlineInput
            deadlineValue={deadlineFilterValue}
            setDeadlineValue={setDeadlineFilterValue}
          />
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <EmployeeProvider>
            <EmployeeDropdown
              setEmployeeValue={setStatusValue}
              employeeValue={statusValue}
            />
          </EmployeeProvider>
          <StatusDropdown
            setStatusValue={setStatusValue}
            statusValue={statusValue}
          ></StatusDropdown>
        </FilterMobileContainer>
        <GoalList refetch={refetch} goalData={filteredGoals} />
        <ListFooter status={["Batida", "Pendente", "Não batida"]} />
      </main>
    </>
  );
};

export default GoalListContainer;
