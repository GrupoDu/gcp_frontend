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
    <div className={styles.userListItem}>
      <span>{user_uuid}</span>
      <span>{name}</span>
      {email && <span>{email}</span>}
      <span>{user_role}</span>
      <div className={styles.buttons}>
        <EditButton href={`${pathname}/edit/${userInfos.user_uuid}`} />
        {isEmployeePage && <AnalysisButton employee_uuid={`analises/${userInfos.user_uuid}`} />}
        <DeleteButton endpoint={deleteButtonEndpoint} refetch={refetch} uuid={user_uuid} />
      </div>
    </div>
  );
};

export default ListItem;
