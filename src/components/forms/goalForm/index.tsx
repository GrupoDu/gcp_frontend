"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useEmployeeType } from "@/hooks/useEmployeeType";
import LinkButton from "@/components/linkButton";
import { useRouter } from "next/navigation";
import { useGoal } from "@/hooks/useGoal";
import { Goal } from "@/types/goal.type";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import SubmitButton from "@/components/ui/submitButton";

const GoalForm = ({
  isEdit,
  goal_id,
}: {
  isEdit: boolean;
  goal_id?: string;
}) => {
  const { welders } = useEmployeeType();
  const { goalsData } = useGoal();
  const [canEdit, setCanEdit] = useState(false);
  const router = useRouter();
  const [goalField, setGoalField] = useState<Goal>({
    title: "",
    description: "",
    goal_type: "geral",
    deadline: "",
    employee_goal: null,
  });

  useEffect(() => {
    let fetchedGoal: Goal | undefined;
    if (isEdit && goalsData) {
      fetchedGoal = goalsData?.find((goal) => goal.goal_id === goal_id);

      if (fetchedGoal) {
        const formattedDeadline =
          fetchedGoal && new Date(fetchedGoal.deadline).toISOString();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGoalField({
          title: fetchedGoal?.title || "",
          description: fetchedGoal?.description || "",
          goal_type: fetchedGoal?.goal_type || "geral",
          deadline: formattedDeadline || "",
          employee_goal: fetchedGoal?.employee_goal || null,
        });
      }
    }
    setCanEdit(!!fetchedGoal);
  }, [isEdit, goalsData, goal_id]);

  const method = isEdit ? "PUT" : "POST";
  const endpoint = isEdit ? `goals/${goal_id}` : "goals";

  return (
    <form
      onSubmit={(e) =>
        handleFormSubmit(e, method, goalField, endpoint, "/metas", router)
      }
      className={styles.registerGoalFormContainer}
    >
      <label className={styles.deadlineInput}>
        <span>Data de entrega</span>
        <input
          type="date"
          onChange={(e) =>
            setGoalField({
              ...goalField,
              deadline: new Date(e.target.value).toISOString(),
            })
          }
          value={goalField.deadline.split("T")[0]}
        />
      </label>
      <label className={styles.titleInput}>
        <span>Título</span>
        <input
          value={goalField.title}
          onChange={(e) =>
            setGoalField({ ...goalField, title: e.target.value })
          }
          type="text"
          placeholder="Título da nova meta"
        />
      </label>
      <label className={styles.descriptionInput}>
        <span>Descrição</span>
        <textarea
          value={goalField.description}
          onChange={(e) =>
            setGoalField({ ...goalField, description: e.target.value })
          }
        />
      </label>
      <label className={`${styles.goalType}`}>
        <span>Tipo de meta</span>
        <select
          name="goal-type"
          value={goalField.goal_type}
          onChange={(e) =>
            setGoalField({ ...goalField, goal_type: e.target.value })
          }
        >
          <option value="geral">Geral</option>
          <option value="funcionario">Funcionário</option>
        </select>
      </label>
      <label
        className={`${styles.employeeGoalInput} ${goalField.goal_type !== "funcionario" && styles.isNotEmployeeType}`}
      >
        <span>Funcionário</span>
        <select
          disabled={goalField.goal_type !== "funcionario"}
          value={goalField.employee_goal || ""}
          onChange={(e) => {
            setGoalField({ ...goalField, employee_goal: e.target.value });
          }}
          name="employee-goal"
        >
          <option value="">Selecionar funcionário</option>
          {welders?.map((welder) => (
            <option key={welder.employee_id} value={welder.employee_id}>
              {welder.name}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.buttons}>
        <LinkButton color="black" href="/metas">
          Cancelar
        </LinkButton>
        <SubmitButton canEdit={canEdit}>{isEdit ? "Editar" : "Salvar"}</SubmitButton>
      </div>
    </form>
  );
};

export default GoalForm;
