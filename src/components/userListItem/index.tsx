import React from "react";
import styles from "./styles.module.scss";
import DeleteButton from "../deleteButton";
import EditButton from "../editButton";
import { usePathname } from "next/navigation";
import { UserPublic } from "@/types/user.type";
import { AnalysisButton } from "@/components/analysisButton";

type ListItemProps = {
  userInfos: UserPublic;
  refetch: () => void;
  deleteButtonEndpoint: string;
};

const ListItem = ({ userInfos, refetch, deleteButtonEndpoint }: ListItemProps) => {
  const pathname = usePathname();
  const isEmployeePage = pathname.includes("funcionarios");
  const { user_uuid, user_role, name, email } = userInfos;

  return (
    <tr>
      <td>{user_uuid}</td>
      <td>{name}</td>
      {email && <td>{email}</td>}
      <td>{user_role}</td>
      <td>
        <div className={styles.buttons}>
          <EditButton href={`${pathname}/edit/${userInfos.user_uuid}`} />
          {isEmployeePage && <AnalysisButton employee_uuid={`analises/${userInfos.user_uuid}`} />}
          <DeleteButton endpoint={deleteButtonEndpoint} refetch={refetch} uuid={user_uuid} />
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
