import React from "react";
import styles from "./styles.module.scss";
import DeleteButton from "../deleteButton";
import EditButton from "../editButton";
import { usePathname } from "next/navigation";
import { UserPublic } from "@/types/user.interface";
import { AnalysisButton } from "@/components/analysisButton";
import { useModal } from "@/hooks/useModal";

type ListItemProps = {
  userInfos: UserPublic;
  refetch: () => void;
  deleteButtonEndpoint: string;
};

const ListItem = ({ userInfos, refetch, deleteButtonEndpoint }: ListItemProps) => {
  const { setShowModal } = useModal();
  const pathname = usePathname();
  const isEmployeePage = pathname.includes("funcionarios");
  const { uuid, role, name, email } = userInfos;

  return (
    <tr>
      <td>{name}</td>
      {email && <td>{email}</td>}
      <td>{role}</td>
      <td>
        <div className={styles.buttons}>
          <EditButton href={`${pathname}/edit/${userInfos.uuid}`} />
          {isEmployeePage && <AnalysisButton employee_uuid={`analises/${userInfos.uuid}?role=${role}`} />}
          <DeleteButton deleteAction={() => setShowModal(true)} />
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
