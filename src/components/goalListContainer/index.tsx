"use client";

import styles from "./styles.module.scss";
import { useGoal } from "@/hooks/useGoal";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import { useState } from "react";
import SearchBar from "../searchBar";
import EmployeeDropdown from "../employeeDropdown";
import { EmployeeProvider } from "@/providers/employee.provider";
import StatusDropdown from "../ui/statusDropdown";
import GoalList from "../cardLists/goalList";
import ListFooter from "../listFooter";

const GoalListContainer = () => {
  const { goalsData } = useGoal();
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [deadlineFilterValue, setDeadlineFilterValue] = useState("");

  console.log("Dados das metas(goalListContainer): ", goalsData);

  return (
    <div className={styles.goalListContainer}>
      <FiltersList hrefButton="/metas/register">
        <DeadlineInput
          deadlineValue={deadlineFilterValue}
          setDeadlineValue={setDeadlineFilterValue}
        />
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
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
      <GoalList goalData={goalsData} />
      <ListFooter status={["Batida", "Pendente", "Não batida"]} />
    </div>
  );
};

export default GoalListContainer;
