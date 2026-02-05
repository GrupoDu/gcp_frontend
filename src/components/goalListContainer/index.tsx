"use client";

import styles from "./styles.module.scss";
import { useGoal } from "@/hooks/useGoal";
import CardGoal from "../ui/cardGoal";
import FiltersList from "../filtersList";
import DeadlineInput from "../ui/deadlineInput";
import { useState } from "react";
import SearchBar from "../searchBar";
import EmployeeDropdown from "../employeeDropdown";
import { EmployeeProvider } from "@/providers/employee.provider";
import StatusDropdown from "../ui/statusDropdown";

const GoalListContainer = () => {
  const { goalsData, err, status } = useGoal();
  const [searchValue, setSearchValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [deadlineFilterValue, setDeadlineFilterValue] = useState("");

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
      <ul className={styles.ul}>
        {goalsData?.map((goal) => (
          <li key={goal.goal_id}>
            <CardGoal
              title={goal.title}
              description={goal.description}
              isChecked={goal.goal_status}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalListContainer;
