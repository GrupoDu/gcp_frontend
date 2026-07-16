"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useEmployeeRole } from "@/hooks/useEmployeeRole";
import LinkButton from "@/components/linkButton";
import { useRouter } from "next/navigation";
import { useGoal } from "@/hooks/useGoal";
import { Goal } from "@/types/goal.interface";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import SubmitButton from "@/components/ui/submitButton";

const GoalForm = ({ isEdit, goalId }: { isEdit: boolean; goalId?: string }) => {
  const { welders } = useEmployeeRole();
  const { goalsData } = useGoal();
  const [canEdit, setCanEdit] = useState(false);
  const router = useRouter();
  const [goalField, setGoalField] = useState<Record<string, unknown>>({
    goalTitle: "",
    goalDescription: "",
    goalType: "geral",
    goalDeadline: "",
    employeeGoal: null,
  });

  useEffect(() => {
    if (isEdit && goalsData) {
      const fetchedGoal = goalsData?.find((goal) => goal.goalUuid === goalId);

      if (fetchedGoal) {
        const formattedDeadline = fetchedGoal && new Date(fetchedGoal.goalDeadline).toISOString();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGoalField({
          goalTitle: fetchedGoal?.goalTitle || "",
          goalDescription: fetchedGoal?.goalDescription || "",
          goalType: fetchedGoal?.goalType || "geral",
          goalDeadline: formattedDeadline || "",
          employeeGoal: fetchedGoal?.employeeGoal || null,
        });
      }
      setCanEdit(fetchedGoal?.goalStatus === "Pendente");
    } else {
      setCanEdit(true);
    }
  }, [isEdit, goalsData, goalId]);

  const method = isEdit ? "PUT" : "POST";
  const endpoint = isEdit ? `goal/${goalId}` : "goal";

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e, { method, endpoint, bodyValues: goalField }, { router, canEdit })}
      className={styles.registerGoalFormContainer}
    >
      <label className={styles.deadlineInput}>
        <span>Data de entrega</span>
        <input
          type="date"
          onChange={(e) =>
            setGoalField({
              ...goalField,
              goalDeadline: new Date(e.target.value).toISOString(),
            })
          }
          value={String(goalField.goalDeadline).split("T")[0]}
        />
      </label>
      <label className={styles.titleInput}>
        <span>Título</span>
        <input
          value={String(goalField.goalTitle)}
          onChange={(e) => setGoalField({ ...goalField, goalTitle: e.target.value })}
          type="text"
          placeholder="Título da nova meta"
        />
      </label>
      <label className={styles.descriptionInput}>
        <span>Descrição</span>
        <textarea
          value={String(goalField.goalDescription)}
          onChange={(e) => setGoalField({ ...goalField, goalDescription: e.target.value })}
        />
      </label>
      <label className={`${styles.goalType}`}>
        <span>Tipo de meta</span>
        <select
          name="goal-type"
          value={String(goalField.goalType)}
          onChange={(e) => setGoalField({ ...goalField, goalType: e.target.value })}
        >
          <option value="geral">Geral</option>
          <option value="funcionario">Funcionário</option>
        </select>
      </label>
      <label
        className={`${styles.employeeGoalInput} ${goalField.goalType !== "funcionario" && styles.isNotEmployeeRole}`}
      >
        <span>Funcionário</span>
        <select
          disabled={goalField.goalType !== "funcionario"}
          value={String(goalField.employeeGoal) || ""}
          onChange={(e) => {
            setGoalField({ ...goalField, employeeGoal: e.target.value });
          }}
          name="employee-goal"
        >
          <option value="">Selecionar funcionário</option>
          {welders?.map((welder) => (
            <option key={welder.employeeUuid} value={welder.employeeUuid}>
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
