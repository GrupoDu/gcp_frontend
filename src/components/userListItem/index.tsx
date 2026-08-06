import React from "react";
import styles from "./styles.module.scss";
import DeleteButton from "../deleteButton";
import EditButton from "../editButton";
import { usePathname } from "next/navigation";
import { UserPublic } from "@/types/user.interface";
import { AnalysisButton } from "@/components/analysisButton";

type ListItemProps = {
  userInfos: UserPublic;
  refetch: () => void;
  deleteButtonEndpoint: string;
};

const ListItem = ({ userInfos, refetch, deleteButtonEndpoint }: ListItemProps) => {
  const pathname = usePathname();
  const isEmployeePage = pathname.includes("funcionarios");
  const { userUuid, userRole, name, email } = userInfos;

  return (
    <tr>
      <td>{userUuid}</td>
      <td>{name}</td>
      {email && <td>{email}</td>}
      <td>{userRole}</td>
      <td>
        <div className={styles.buttons}>
          <EditButton href={`${pathname}/edit/${userInfos.userUuid}`} />
          {isEmployeePage && <AnalysisButton employee_uuid={`analises/${userInfos.userUuid}?role=${userRole}`} />}
          <DeleteButton endpoint={deleteButtonEndpoint} refetch={refetch} uuid={userUuid} />
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
