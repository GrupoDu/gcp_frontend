"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useEmployeeType } from "@/hooks/useEmployeeType";
import LinkButton from "@/components/linkButton";
import { useRouter } from "next/navigation";
import { useGoal } from "@/hooks/useGoal";
import { Goal } from "@/types/goal.type";
import { toast } from "react-toastify";

const RegisterGoalForm = ({
  isEdit,
  goal_id,
}: {
  isEdit: boolean;
  goal_id?: string;
}) => {
  const { welders } = useEmployeeType();
  const { goalsData } = useGoal();
  const router = useRouter();
  const [goalField, setGoalField] = useState<Goal>({
    title: "",
    description: "",
    goal_type: "geral",
    deadline: "",
    employee_goal: null,
  });

  async function createGoal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: goalField.title,
          description: goalField.description,
          goal_type: goalField.goal_type,
          deadline: new Date(goalField.deadline).toISOString(),
          employee_goal: goalField.employee_goal
            ? goalField.employee_goal
            : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar meta.");
      }

      return router.push("/metas");
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  async function updateGoal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/goals/${goal_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          updateGoalValues: {
            title: goalField.title,
            description: goalField.description,
            goal_type: goalField.goal_type,
            deadline: new Date(goalField.deadline).toISOString(),
            employee_goal: null,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar meta.");
      }

      router.push("/metas");
      return toast.success("Meta atualizada com sucesso!");
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  useEffect(() => {
    let fetchedGoal: Goal | undefined;
    if (isEdit && goalsData) {
      fetchedGoal = goalsData?.find((goal) => goal.goal_id === goal_id);

      if (fetchedGoal) {
        const formattedDeadline =
          fetchedGoal &&
          new Date(fetchedGoal.deadline).toISOString().split("T")[0];

        setGoalField({
          title: fetchedGoal?.title || "",
          description: fetchedGoal?.description || "",
          goal_type: fetchedGoal?.goal_type || "geral",
          deadline: formattedDeadline || "",
          employee_goal: fetchedGoal?.employee_goal || null,
        });
      }
    }
  }, [isEdit, goalsData, goal_id]);

  console.log("goalField: ", goalField);

  return (
    <form
      onSubmit={(e) => (isEdit ? updateGoal(e) : createGoal(e))}
      className={styles.registerGoalFormContainer}
    >
      <label className={styles.deadlineInput}>
        <span>Data de entrega</span>
        <input
          type="date"
          onChange={(e) =>
            setGoalField({ ...goalField, deadline: e.target.value })
          }
          value={goalField.deadline}
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
        <button type="submit" className={styles.saveButton}>
          {isEdit ? "Salvar" : "Criar"}
        </button>
      </div>
    </form>
  );
};

export default RegisterGoalForm;
