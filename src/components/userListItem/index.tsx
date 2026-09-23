import React from "react";
import styles from "./styles.module.scss";
import DeleteButton from "../deleteButton";
import EditButton from "../editButton";
import { usePathname } from "next/navigation";
import { UserPublic } from "@/types/user.interface";
import { AnalysisButton } from "@/components/analysisButton";
import { useModal } from "@/hooks/useModal";

type ListItemData = {
  uuid: string;
  name: string;
  role: string;
  email?: string;
};

type ListItemProps = {
  data: ListItemData;
  refetch: () => void;
  deleteButtonEndpoint: string;
};

const ListItem = ({ data, refetch, deleteButtonEndpoint }: ListItemProps) => {
  const { setShowModal } = useModal();
  const pathname = usePathname();
  const isEmployeePage = pathname.includes("funcionarios");
  const { role, name, email, uuid } = data;

  return (
    <tr>
      <td>{name}</td>
      {email && <td>{email}</td>}
      <td>{role}</td>
      <td>
        <div className={styles.buttons}>
          <EditButton href={`${pathname}/edit/${uuid}`} />
          {isEmployeePage && <AnalysisButton employee_uuid={`analises/${uuid}?role=${role}`} />}
          <DeleteButton deleteAction={() => setShowModal(true)} />
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
